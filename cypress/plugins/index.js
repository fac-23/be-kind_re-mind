const { execFileSync } = require("child_process");

module.exports = (on, config) => {
  on("task", {
    resetDb: () => {
      console.log("Resetting DB...");
      return execFileSync("./scripts/populate_db");
    },
  });
};
