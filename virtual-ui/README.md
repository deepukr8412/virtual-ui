<div align="center">
  <img src="https://img.shields.io/badge/Virtual.AI-Ready-blue?style=for-the-badge" alt="Virtual.AI"/>
  <h1>✨ Virtual UI Platform ✨</h1>
  <p><strong>A Next-Generation UI Component Generation and Management Ecosystem</strong></p>
</div>

---

Virtual UI is a full-stack platform designed for seamlessly generating, testing, and managing high-quality UI components powered by AI. It consists of a React frontend (Client), a Node.js API (Server), and a modular component library (Lib).

## 🚀 Features

- **AI-Powered Component Generation:** Instantly generate complete React UI components using the integrated OpenRouter AI capabilities.
- **Component Library Sync:** A robust system that automatically syncs local components built in `virtual-ui-lib` to the backend database at startup.
- **Credit & Payment System:** Native integration with Razorpay to seamlessly handle AI credit top-ups with beautiful, animated UI overlays.
- **Premium User Interface:** Custom glass-morphism effects, dynamic CSS animations (Framer Motion), and modern aesthetics designed to wow users.

## 🛠️ Project Structure

This is a monorepo containing three main packages:

1. **`virtual-ui-client`** - The React + Vite frontend application where users interact with the generator and their dashboards.
2. **`virtual-ui-server`** - The Node.js + Express backend that handles authentication, database logic, AI API calls, and Razorpay payments.
3. **`virtual-ui-lib`** - The dedicated component library where newly generated or custom-coded UI elements are stored and exported.

## ⚙️ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB connection string
- Razorpay Test Credentials
- OpenRouter API Key (or other AI provider)

### 2. Environment Setup
You will need to set up environment variables for both the client and the server.
Refer to the `.env.example` files in both the `virtual-ui-client` and `virtual-ui-server` directories.

### 3. Installation
Navigate into each directory and install dependencies:

```bash
# In virtual-ui-client
cd virtual-ui-client
npm install

# In virtual-ui-server
cd ../virtual-ui-server
npm install

# In virtual-ui-lib
cd ../virtual-ui-lib
npm install
```

### 4. Running Locally

**Start the Server:**
```bash
cd virtual-ui-server
npm start
```
*(Note: When the server connects to the database, it will automatically sync components exported in `virtual-ui-lib/src/index.js` into the database!)*

**Start the Client:**
```bash
cd virtual-ui-client
npm run dev
```

The frontend will usually start on `http://localhost:5173` and the backend on `http://localhost:8000`.

## 🧑‍💻 Component Workflow
To manually create a component:
1. Build your component inside `virtual-ui-lib/src/components/YourComponent/YourComponent.jsx`.
2. Export it inside `virtual-ui-lib/src/index.js`:
   ```javascript
   export { YourComponent } from "./components/YourComponent/YourComponent.jsx";
   ```
3. Restart your Node server. The system automatically reads the new export and makes it available to the client!

---
<div align="center">
  <sub>Built with ❤️ by You</sub>
</div>
