//database wine_db

module.exports = function(sequelize, DataTypes) {
  const wine = sequelize.define("wine", {
    upc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.CHAR(255),
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
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    country: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    geoOne: {
      type: DataTypes.CHAR(45)
    },
    geoTwo: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    typeOne: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    typeTwo: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    typeThree: {
      type: DataTypes.CHAR(45),
      allowNull: false
    },
    unitSize: {
      type: DataTypes.CHAR(45),
      allowNull: false
    }
  });
  return wine;
};
