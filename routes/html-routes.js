const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/wines", async (req, res) => {
  res.render("wines");
});

router.get("/data", async (req, res) => {
  res.render("data");
});

router.get("/import", async (req, res) => {
  res.render("import");
});

// Export routes for server.js to use.
module.exports = router;
