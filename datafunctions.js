const db = require("./models");
const moment = require("moment");
const { Op } = require("sequelize");

const getData = {
  getSalesData: async period => {
    console.log("into get Data");
    const data = await db.sale.findAll({
      attributes: ["unitssold"],
      where: {
        date: {
          [Op.lt]: moment("2020-08-26", ["YYYY-MM-DD"]), //change this to moment() once full data is live
          [Op.gte]: moment("2020-08-26", ["YYYY-MM-DD"]).subtract(
            period,
            "days"
          )
        }
      }
    });
    return data;
  },
  getAllData: async () => {
    const data = await db.sale.findAll({});
    return data;
  }
};

module.exports = getData;
