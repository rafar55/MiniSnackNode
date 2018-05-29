module.exports = (sequelize, DataTypes) => {
  const ProductPriceHistory = sequelize.define('ProductsPriceHistory', {
    OldPrice: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'OldPrice is not a valid decimal number',
        },
        min: {
          args: [1],
          msg: 'OldPrice must be greater than or equal to 1',
        },
      },
    },
    NewPrice: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'NewPrice is not a valid decimal number',
        },
        min: {
          args: [1],
          msg: 'New Price must be greater than or equal to 1',
        },
      },
    },
  }, {
    freezeTableName: true,
  });
  return ProductPriceHistory;
};

