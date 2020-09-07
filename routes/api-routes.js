// // Requiring our models
// const db = require("../models");

// module.exports = function(app) {
//   app.post("/api/product", (req, res) => {
//     db.product.create(req.body).then(dbresult => {
//       res.json(dbresult);
//     });
//   });

//   app.get("/api/product", (req, res) => {
//     console.log("get product");
//     db.product.findAll({}).then(dbresult => {
//       // console.log("db:", dbresult);
//       res.json(dbresult);
//     });
//   });
// };
