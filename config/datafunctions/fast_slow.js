const moment = require("moment");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../../models");

const movementBuilder = async (date, range) => {
  const movementObj = [];
  const currentDate = moment(date).format("YYYY-MM-DD");
  const date1 = moment(currentDate)
    .subtract(range, "days")
    .format("YYYY-MM-DD");
  const date2 = moment(currentDate)
    .subtract(range * 2, "days")
    .format("YYYY-MM-DD");
  console.log(currentDate, date1, date2);
  const data = await sequelize.query(
    `
	SELECT 
	products.productname AS name,
	max(p1.revenue) AS p1,
    max(p2.revenue) AS p2,
    max((p1.revenue - p2.revenue) / p2.revenue) as percent_cng,
    max(p1.revenue - p2.revenue) as revenue_cng
FROM sales
LEFT JOIN 
    (
  		SELECT
			sum(products.price * sales.unitssold) AS revenue,
            sum(sales.unitssold) as unitssold,
            products.upc as upc
        FROM products
        INNER JOIN sales
        ON products.upc = sales.upc
        WHERE sales.date <= "${currentDate}" AND sales.date > "${date1}"
        GROUP BY upc
	) AS p1
    ON sales.upc = p1.upc
LEFT JOIN 
    (
  		SELECT
			sum(products.price * sales.unitssold) AS revenue,
            sum(sales.unitssold) as unitssold,
            products.upc as upc
        FROM products
        INNER JOIN sales
        ON products.upc = sales.upc
        WHERE sales.date <= "${date1}" AND sales.date > "${date2}"
        GROUP BY upc
	) AS p2
    ON sales.upc = p2.upc
INNER JOIN 
	products
ON
	sales.upc = products.upc
GROUP BY
	name
ORDER BY
	p1 DESC
`,
    { type: QueryTypes.SELECT }
  );
  const queryArr = [];
  data.forEach(element => {
    queryArr.push({
      name: `${element.name.trim()}`,
      value: parseInt(element.revenue_cng)
    });
  });
  queryArr.sort((a, b) => {
    return a.value - b.value;
  });
  const top5 = [];
  const bottom5 = [];
  for (i = 0; i <= range; i++) {
    top5.push(queryArr[i]);
    queryArr.lastIndexOf();
    bottom5.push(queryArr[queryArr.length - i - 1]);
  }
  movementObj.push(top5);
  movementObj.push(bottom5);
  return movementObj;
};

module.exports.move = movementBuilder;
