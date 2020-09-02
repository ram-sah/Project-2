var express = require("express");

var router = express.Router();

// Import the model (.js) to use its database functions.
var { product, sale, user} = require("../models/index.js");
const getData = require("../datafunctions.js");

// router.get("/", async (req, res) => {
//     res.render("index");
// });

// Create all our routes and set up logic within those routes where required.
router.get("/:period", async (req, res) => {
    console.log("into routing function")
    const period = req.params.period;
    const data = await getData.getSalesData(period);
  product.all(function(data) {
    let hbsObject = {
      data: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// Export routes for server.js to use.
module.exports = router;