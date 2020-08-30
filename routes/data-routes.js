//const express = require("express");
//const db = require("../models");
const getData = require("../datafunctions.js");

module.exports = function(app) {
  app.get("/:period", async (req, res) => {
    console.log("into routing function");
    const period = req.params.period;
    //const end = req.params.end;
    const data = await getData.getSalesData(period);
    res.json(data);
  });
};
