import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  assetsInclude: /\.(txt)$/i,
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
     // Asegúrate de que el puerto sea correcto
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/storage'],
  }
});