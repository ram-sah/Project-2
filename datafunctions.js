//const db = require("./models");
//const moment = require("moment");
//const { Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("./models");

const getData = {
  getSalesData: async period => {
    console.log(period);
    // const today = moment(new Date()).format("YYYY-MM-DD");
    // console.log(today.subtract(2, "days"));
    const date1 = "2020-08-26";
    //const date1 = "2020-08-26";
    //const date2 = moment("2020-08-26", "YYYY-MM-DD").subtract(period, "days");
    //need to get these moments working, not parsing the dates
    const date2 = "2020-08-24";
    const date3 = "2020-08-22";
    const sales1 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) AS result1 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date1}" AND sales.date > "${date2}";`,
      { type: QueryTypes.SELECT }
    );
    const sales2 = await sequelize.query(
      `SELECT sum(products.price * sales.unitssold) AS result2 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date2}" AND sales.date > "${date3}";`,
      { type: QueryTypes.SELECT }
    );
    const margin1 = await sequelize.query(
      `SELECT 1 - sum(products.unitcost *sales.unitssold) / sum(products.price * sales.unitssold) AS result1 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date1}" AND sales.date > "${date2}";`,
      { type: QueryTypes.SELECT }
    );
    const margin2 = await sequelize.query(
      `SELECT 1 - sum(products.unitcost *sales.unitssold) / sum(products.price * sales.unitssold) AS result2 FROM products INNER JOIN sales ON products.upc = sales.upc WHERE sales.date <= "${date2}" AND sales.date > "${date3}";`,
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
    console.log(sales1, sales2, margin1, margin2, aring1, aring2);
    const returnboj = {
      sales1: sales1[0].result1,
      sales2: sales2[0].result2,
      margin1: margin1[0].result1,
      margin2: margin2[0].result2,
      aring1: aring1[0].result1,
      aring3: aring2[0].result2
    };
    return returnboj;
  }
};

module.exports = getData;
