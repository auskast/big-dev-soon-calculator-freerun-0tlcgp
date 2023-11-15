import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        "**/index.{js,ts}",
        "**/*.{test,stories}.{js,jsx,ts,tsx}",
        "**/__{fixtures,helpers,mocks,snapshots}__/**",
      ],
      include: ["**/src/**/*.{js,jsx,ts,tsx}"],
    },
    css: false,
    environment: "jsdom",
    include: ["src/**/*.test.{js,jsx,ts,tsx}"],
    mockReset: true,
    setupFiles: ["./vitestEnv.ts"],
  },
});
