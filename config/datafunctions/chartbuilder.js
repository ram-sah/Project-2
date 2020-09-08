const moment = require("moment");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");

const chartBuilder = async (date, range) => {
  const chartObject = [];
  let currentDate = moment(date).format("YYYY-MM-DD");
  for (let i = 0; i < range; i++) {
    const pt1 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) AS point1 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date = "${currentDate}";`,
      { type: QueryTypes.SELECT }
    );
    const pt2 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) AS point2 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date = "${moment(
        currentDate
      )
        .subtract(range, "days")
        .format("YYYY-MM-DD")}";`,
      { type: QueryTypes.SELECT }
    );
    // reset the current date Var
    currentDate = moment(currentDate)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    chartObject.push({
      date: moment(currentDate).valueOf(),
      open: parseInt(pt1[0].point1),
      close: parseInt(pt2[0].point2)
    });
  }
  return chartObject;
};

module.exports.cb = chartBuilder;
