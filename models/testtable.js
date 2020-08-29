"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TestTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestTable.init(
    {
      testName: DataTypes.STRING,
      testName2: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "TestTable"
    }
  );
  return TestTable;
};
