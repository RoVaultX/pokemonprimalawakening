import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages serves `404.html` for missing paths; copy `index.html` so the SPA loads on refresh/deep links. */
function githubPagesSpaFallback(): Plugin {
  let outDir = "dist";
  return {
    name: "github-pages-spa-fallback",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const root = join(process.cwd(), outDir);
      copyFileSync(join(root, "index.html"), join(root, "404.html"));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  return {
    plugins: [react(), githubPagesSpaFallback()],
    base: env.VITE_BASE_PATH ?? "/",
    server: {
      // Avoid Windows reserved/excluded ranges (Hyper-V often blocks 5173 with EACCES).
      host: "localhost",
      port: Number(env.VITE_DEV_PORT) || 3000,
      strictPort: false,
    },
  };
});
