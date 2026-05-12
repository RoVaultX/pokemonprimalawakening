import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "VITE_");
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH ?? "/",
    server: {
      // Avoid Windows reserved/excluded ranges (Hyper-V often blocks 5173 with EACCES).
      host: "localhost",
      port: Number(env.VITE_DEV_PORT) || 3000,
      strictPort: false,
    },
  };
});
