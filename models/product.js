"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { // eslint-disable-line
      // define association here
    }
  }
  product.init(
    {
      upc: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      productname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      unitcost: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      vendor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      geoone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      geotwo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typeone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typetwo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      typethree: {
        type: DataTypes.STRING,
        allowNull: false
      },
      unitsize: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "product"
    }
  );
  return product;
};
