const moment = require("moment");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const { cb } = require("./datafunctions/chartbuilder.js");
const { move } = require("./datafunctions/fast_slow.js");

const getData = {
  getSalesData: async period => {
    const date1 = moment("2020-08-31").format("YYYY-MM-DD"); // dummy current date to match data
    const date1Input = moment(date1).subtract(period, "days");
    const date2 = moment(date1)
      .subtract(period, "days")
      .format("YYYY-MM-DD");
    const date3 = moment(date1Input)
      .subtract(period, "days")
      .format("YYYY-MM-DD");
    // const chartData = await cb(date1, period);
    // const moveData = await move(date1, period);
    const sales1 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) AS result1 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date1}" AND sales.date > "${date2}";`,
      { type: QueryTypes.SELECT }
    );
    const sales2 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) AS result2 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date2}" AND sales.date > "${date3}";`,
      { type: QueryTypes.SELECT }
    );
    const margin1 = await sequelize.query(
      `SELECT 1 - sum(products.unitcost * sales.unitssold) / sum(products.price * sales.unitssold) AS result1 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date1}" AND sales.date > "${date2}";`,
      { type: QueryTypes.SELECT }
    );
    const margin2 = await sequelize.query(
      `SELECT 1 - sum(products.unitcost * sales.unitssold) / sum(products.price * sales.unitssold) AS result2 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date2}" AND sales.date > "${date3}";`,
      { type: QueryTypes.SELECT }
    );
    const aring1 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) / sum(sales.unitssold) result1 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date1}" AND sales.date > "${date2}";`,
      { type: QueryTypes.SELECT }
    );
    const aring2 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) / sum(sales.unitssold) result2 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date2}" AND sales.date > "${date3}";`,
      { type: QueryTypes.SELECT }
    );

    const returnObj = {
      sales1: sales1[0].result1,
      sales2: sales2[0].result2,
      margin1: margin1[0].result1,
      margin2: margin2[0].result2,
      aring1: aring1[0].result1,
      aring3: aring2[0].result2
    };
    return returnObj;
  },
  getChartData: async period => {
    const date1 = moment("2020-08-31").format("YYYY-MM-DD"); // dummy current date to match data
    return cb(date1, period);
  },
  getMoveData: async period => {
    const date1 = moment("2020-08-31").format("YYYY-MM-DD"); // dummy current date to match data
    return move(date1, period);
  }
};

module.exports = getData;
