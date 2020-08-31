"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(/*models*/) {
      // define association here
    }
  }
  sale.init(
    {
      upc: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      unitssold: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "sale"
    }
  );

  sale.associate = models => {
    sale.belongsTo(models.product, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return sale;
};
