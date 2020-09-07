//const require config;
const getData = require("../config/orm.js");

module.exports = function(app) {
  //Pull Data
  app.get("/:period", async (req, res) => {
    console.log("into routing function");
    const period = req.params.period;
    const data = await getData.getSalesData(period);
    res.json(data);
  });
};
