import fs from "fs";
import path from "path";
import Component from "../models/components.model.js";
import User from "../models/user.model.js";

/**
 * Auto-sync: reads virtual-ui-lib/src/index.js exports,
 * creates any missing components in DB as public, and
 * ensures existing ones are marked public.
 */
export async function autoSyncLibraryComponents() {
  try {
    const libPath = path.join(process.cwd(), "../virtual-ui/virtual-ui-lib/src/index.js");

    if (!fs.existsSync(libPath)) {
      console.log("⚠️  Auto-sync skipped: library index.js not found");
      return;
    }

    const indexContent = fs.readFileSync(libPath, "utf8");
    const componentNames = [];
    const lines = indexContent.split("\n");

    lines.forEach((line) => {
      const match = line.match(
        /export\s+{\s*([^}]+)\s*}\s+from\s+"\.\/components\/([^"]+)"/
      );
      if (match) {
        const exports = match[1].split(",").map((e) => e.trim());
        const componentPath = match[2];

        exports.forEach((exportName) => {
          const pathParts = componentPath.split("/");
          const folderName = pathParts[0];
          const fileName = pathParts[1]?.replace(".jsx", "") || folderName;

          if (exportName === folderName || exportName === fileName) {
            componentNames.push({ name: exportName, path: componentPath });
          }
        });
      }
    });

    if (componentNames.length === 0) return;

    const existingComponents = await Component.find();
    const existingNames = new Set(existingComponents.map((c) => c.name));

    // Find an admin to use as owner for new components
    const admin = await User.findOne({ role: "admin" });

    let synced = 0;
    let skipped = 0;

    for (const comp of componentNames) {
      if (existingNames.has(comp.name)) {
        // Make sure it's public
        const existing = await Component.findOne({ name: comp.name });
        if (
          existing.visibility !== "public" ||
          existing.npmPackage !== "virtual-ui-lib"
        ) {
          existing.visibility = "public";
          existing.npmPackage = "virtual-ui-lib";
          await existing.save();
          synced++;
        } else {
          skipped++;
        }
        continue;
      }

      // Read component file
      const componentFilePath = path.join(
        process.cwd(),
        "../virtual-ui/virtual-ui-lib/src/components",
        comp.path
      );

      if (!fs.existsSync(componentFilePath)) {
        skipped++;
        continue;
      }

      const code = fs.readFileSync(componentFilePath, "utf8");

      await Component.create({
        name: comp.name,
        code,
        props: [],
        owner: admin ? admin._id : null,
        visibility: "public",
        npmPackage: "virtual-ui-lib",
      });

      synced++;
    }

    if (synced > 0) {
      console.log(`🔄 Auto-sync: ${synced} component(s) synced, ${skipped} already up-to-date`);
    } else {
      console.log(`✅ Auto-sync: all ${skipped} component(s) already up-to-date`);
    }
  } catch (error) {
    console.error("⚠️  Auto-sync error:", error.message);
  }
}
