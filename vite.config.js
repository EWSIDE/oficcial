import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import path from "path";

export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
  server: {
    https: true,
    host: true, // доступ по IP
    port: 5173,
  },
});