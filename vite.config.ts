import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240, // Only compress files > 10KB
      deleteOriginFile: false, // Keep original uncompressed files
      verbose: true, // Log compression stats
    }),
  ],
  server: {
    port: 3000,
  },
});
