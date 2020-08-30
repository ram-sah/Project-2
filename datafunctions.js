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
          [Op.lt]: moment(),
          [Op.gte]: moment().subtract(period, "days").toDate()
        }
      }
    });
    return data;
  }
};

module.exports = getData;
