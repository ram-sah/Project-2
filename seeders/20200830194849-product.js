'use strict';

module.exports = {
  up: async (queryInterface /*,Sequelize*/) => {
    await queryInterface.bulkInsert("products", [
      {
        upc: 70008344147,
        productname: "MOTHER ROCK",
        unitcost: 15.19,
        price: 29.99,
        vendor: "VINESTREET",
        country: "ZA",
        //geoone: ,
        //geotwo: ,
        typeone: "white",
        typetwo: "still",
        //typethree: ,
        unitsize: "750ML",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface /*,Sequelize*/) => {
    await queryInterface.bulkDelete("products", null, {});
  }
};
