module.exports = {
  testDir: "./tests", // Ensure this points to the correct folder where your test file is located
  timeout: 10000,
  retries: 0,
  workers: 5,
  use: {
    baseURL: "http://localhost:8888",
    headless: true,
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "e2e-headless-chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
};
