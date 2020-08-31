// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function(app) {
  //Get main page index file
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  //Get wine page
  app.get("/wines", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/wines.html"));
  });
  //Get data page
  app.get("/data", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/data.html"));
  });
  //get import page
  app.get("/import", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/import.html"));
  });
};
