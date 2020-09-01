"use strict";

module.exports = {
  up: async (queryInterface /*,Sequelize*/) => {
    await queryInterface.bulkInsert("sales", [
      {
        upc: 70008344147,
        unitssold: 98,
        date: "2020-08-25",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface /* ,Sequelize*/) => {
    return queryInterface.bulkDelete("sales", null, {});
  }
};
