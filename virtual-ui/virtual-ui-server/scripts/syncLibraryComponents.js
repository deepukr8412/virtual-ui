import fs from 'fs';
import path from 'path';
import axios from 'axios';

const SERVER_URL = 'http://localhost:8000';

// Read the library index file to get all component names
const libPath = path.join(process.cwd(), '../virtual-ui-lib/src/index.js');
const indexContent = fs.readFileSync(libPath, 'utf8');

// Extract component names from export statements
const componentNames = [];
const exportRegex = /export\s+{\s*([^}]+)\s*}\s+from\s+"\.\/components\/([^"]+)"/g;
let match;

while ((match = exportRegex.exec(indexContent)) !== null) {
  const exports = match[1].split(',').map(e => e.trim());
  const componentPath = match[2];
  
  exports.forEach(exportName => {
    // Skip if it's not the main component (e.g., skip re-exports)
    if (componentPath.includes(exportName) || componentPath.split('/').pop().replace('.jsx', '') === exportName) {
      componentNames.push({
        name: exportName,
        path: componentPath
      });
    }
  });
}

console.log('Found components in library:', componentNames.map(c => c.name));

async function syncComponents() {
  try {
    // Get existing components first
    const existingRes = await axios.get(`${SERVER_URL}/api/component/all-components`, {
      withCredentials: true
    });
    const existingComponents = existingRes.data;
    const existingNames = new Set(existingComponents.map(c => c.name));

    let synced = 0;
    let skipped = 0;

    for (const comp of componentNames) {
      if (existingNames.has(comp.name)) {
        console.log(`✓ ${comp.name} already exists - skipped`);
        skipped++;
        continue;
      }

      // Read component code
      const componentFilePath = path.join(process.cwd(), '../virtual-ui-lib/src/components', comp.path, `${comp.name}.jsx`);
      
      if (!fs.existsSync(componentFilePath)) {
        console.log(`✗ ${comp.name} file not found - skipped`);
        skipped++;
        continue;
      }

      const code = fs.readFileSync(componentFilePath, 'utf8');

      try {
        // Save component (this requires admin auth - you'll need to be logged in)
        const saveRes = await axios.post(`${SERVER_URL}/api/component/save`, {
          name: comp.name,
          code,
          props: []
        }, {
          withCredentials: true
        });

        console.log(`✓ ${comp.name} saved (ID: ${saveRes.data._id})`);
        synced++;

        // Publish it
        await axios.post(`${SERVER_URL}/api/component/publish`, {
          componentId: saveRes.data._id
        }, {
          withCredentials: true
        });

        console.log(`✓ ${comp.name} published to npm`);
      } catch (error) {
        console.log(`✗ ${comp.name} failed: ${error.response?.data?.message || error.message}`);
      }
    }

    console.log(`\nSync complete: ${synced} synced, ${skipped} skipped`);
    process.exit(0);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

syncComponents();
