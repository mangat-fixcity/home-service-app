import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  root: "client/src", // Points Vite to the folder containing your index.html
  build: {
    outDir: "../../../dist/public", // Moves the finished build up into the main dist folder
    emptyOutDir: true,
  },
});
