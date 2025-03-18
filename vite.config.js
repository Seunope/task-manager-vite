import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import importMetaEnv from "@import-meta-env/unplugin";
// // import createSharedViteConfig from "../shared-vite-config.mjs";

// export default defineConfig({
//   plugins: [importMetaEnv.vite({ example: ".env" })],
//   build: {
//     sourcemap: true,
//   },
//   // ...createSharedViteConfig(),
// });

// export default defineConfig({
//   plugins: [react()],
// });


export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});

// console.log("API URL:", process.env.VITE_API_URL)

// import { defineConfig, loadEnv } from 'vite';

// export default defineConfig(({ mode }) => {

//   const env = loadEnv(mode, process.cwd(), '');

//   console.log("API URL:", env.VITE_API_URL);

//   return {
//     plugins: [react(), ImportMetaEnvPlugin.vite(pluginOptions)],
//   };
// });
