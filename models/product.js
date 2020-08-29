module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    upc: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unitCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    vendor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    geoOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    geoTwo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeOne: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeTwo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeThree: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unitSize: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Product;
};
