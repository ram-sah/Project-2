"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      upc: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unitCost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      vendor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      geoOne: {
        type: Sequelize.STRING,
        allowNull: false
      },
      geoTwo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      typeOne: {
        type: Sequelize.STRING,
        allowNull: false
      },
      typeTwo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      typeThree: {
        type: Sequelize.STRING,
        allowNull: false
      },
      unitSize: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }
};
