module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Quantity must be a valid integer',
        },
        min: {
          args: [1],
          msg: 'Quantity must be greater than  or equal to 1',
        },
      },
    },
  });
  return Orders;
};
