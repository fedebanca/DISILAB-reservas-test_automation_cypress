const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true,
    experimentalStudio: true,
    scrollBehavior: "center",
    defaultCommandTimeout: 1000
  },
});
