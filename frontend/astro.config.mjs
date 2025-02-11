// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";  // Ensure Tailwind is installed
import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
    integrations: [react(), tailwind()],
  });
