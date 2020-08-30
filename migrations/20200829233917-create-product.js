"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      upc: {
        type: Sequelize.BIGINT
      },
      productname: {
        type: Sequelize.STRING
      },
      unitcost: {
        type: Sequelize.DECIMAL
      },
      price: {
        type: Sequelize.DECIMAL
      },
      vendor: {
        type: Sequelize.STRING
      },
      geoone: {
        type: Sequelize.STRING
      },
      geotwo: {
        type: Sequelize.STRING
      },
      typeone: {
        type: Sequelize.STRING
      },
      typetwo: {
        type: Sequelize.STRING
      },
      typethree: {
        type: Sequelize.STRING
      },
      unitsize: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => { // eslint-disable-line
    await queryInterface.dropTable("products");
  }
};
