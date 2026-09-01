import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  webServer: {
    command: "npx vite --port 4173 --strictPort",
    url: "http://localhost:4173/detectores-fumaca/",
    reuseExistingServer: false,
    timeout: 120000,
  },
  use: {
    baseURL: "http://localhost:4173/detectores-fumaca/",
  },
  timeout: 30000,
  reporter: "list",
});
