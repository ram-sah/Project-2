const express = require("express");

const router = express.Router();

const getData = require("../config/orm.js");
const db = require("../models");

router.get("/wines", async (req, res) => {
  res.render("wines");
});

router.get("/data", async (req, res) => {
  res.render("data");
});

router.get("/import", async (req, res) => {
  res.render("import");
});

router.get("/", async (req, res) => {
  res.redirect("/7");
});

router.get("/getchart/:period", async (req, res) => {
  try {
    const period = req.params.period;
    const data = await getData.getChartData(period);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getmove/:period", async (req, res) => {
  try {
    const period = req.params.period;
    const data = await getData.getMoveData(period);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:period", async (req, res) => {
  const period = req.params.period;
  const data = await getData.getSalesData(period);
  const hbsObject = {
    data: data
  };
  res.render("index", hbsObject);
});

router.get("/api/product", (req, res) => {
  db.product.findAll({}).then(dbresult => {
    res.json(dbresult);
  });
});

module.exports = router;
