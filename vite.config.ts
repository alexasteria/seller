import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // Set base path for GitHub Pages when building in CI
  // If running in GitHub Actions, GITHUB_REPOSITORY is like "owner/repo"
  // This makes assets served from "/repo/" which GH Pages requires
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : "/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8085",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
