# Project Setup Guide

This guide provides step-by-step instructions to set up this repository locally on another laptop. Follow these steps to avoid common configuration hassles.

## Prerequisites
Ensure you have the following installed before proceeding:

- **Node.js**: [Download Node.js](https://nodejs.org/en/download/)
- **Astro**: [Astro Documentation](https://docs.astro.build/en/getting-started/)
- **Tailwind CSS (v3)**: [Tailwind Installation Guide](https://tailwindcss.com/docs/installation)
- **React**: [React Documentation](https://react.dev/)

## Installation Steps

### 1️⃣ Clone the Repository
```sh
git clone <repository-url>
cd <repository-folder>
```

### 2️⃣ Install Dependencies
Run the following command to install all required packages:
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```

### 4️⃣ Open in Browser
After running the development server, visit:
```
http://localhost:4321/
```

## Project Structure
```
├── src/
│   ├── components/
│   │   ├── Counter.jsx
│   ├── pages/
│   │   ├── index.astro
│   ├── styles/
│   │   ├── main.css
├── astro.config.mjs
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig.json
```

## Key Configuration Files

### **1️⃣ Astro Configuration (`astro.config.mjs`)**
```js
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
    integrations: [react(), tailwind()],
});
```

### **2️⃣ Tailwind CSS Configuration (`tailwind.config.cjs`)**
```js
module.exports = {
  content: [
    "./src/**/*.{html,js,astro}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### **3️⃣ PostCSS Configuration (`postcss.config.cjs`)**
```js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
```

### **4️⃣ Dependencies (`package.json`)**
```json
{
  "dependencies": {
    "@astrojs/react": "^4.2.0",
    "@astrojs/tailwind": "^6.0.0",
    "astro": "^5.2.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.1"
  }
}
```

## Troubleshooting
- **If styles don’t apply**: Ensure Tailwind CSS is installed as v3.x and `@astrojs/tailwind` is included in `astro.config.mjs`.
- **If React integration fails**: Verify that `@astrojs/react` is properly installed and included in `astro.config.mjs`.
- **For TypeScript issues**: Check the `tsconfig.json` file and ensure `astro/tsconfigs/strict` is included.

---
### 🎉 Now you’re all set up! Happy coding! 🚀

