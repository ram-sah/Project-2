//const express = require("express");
//const db = require("../models");
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const getData = require("../datafunctions.js");

module.exports = function(app) {
  //Get main page index file
  // app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/index.html"));
  // });
  // //Get wine page
  // app.get("/wines", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/wines.html"));
  // });
  // //Get data page
  // app.get("/data", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/data.html"));
  // });
  // //get import page
  // app.get("/import", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/import.html"));
  // });

  //Pull Data
  app.get("/:period", async (req, res) => {
    console.log("into routing function");
    const period = req.params.period;
    const data = await getData.getSalesData(period);
    res.json(data);
  });
  app.get("/aaa", async (req, res) => {
    const data = await getData.getAllData();
    res.json(data);
  });
};
