import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    // Set base path for GitHub Pages when building in CI
    // If running in GitHub Actions, GITHUB_REPOSITORY is like "owner/repo"
    // This makes assets served from "/repo/" which GH Pages requires
    base: process.env.GITHUB_REPOSITORY
        ? "/".concat(process.env.GITHUB_REPOSITORY.split('/')[1], "/")
        : '/',
    server: {
        allowedHosts: ['slow-ideas-hide.loca.lt', "localhost"]
    }
});
