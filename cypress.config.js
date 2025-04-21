const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  viewportWidth: 1920,
  viewportHeight: 1080,
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: true,
  videoCompression: 32,
  watchForFileChanges: false,
  experimentalStudio: true,
  e2e: {
    experimentalStudio: true,
    baseUrl: 'https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring',
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
  },
});