module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Produtcs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: 'The product name is requiered',
        },
      },
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: 'The description must be less than 500 characters',
        },
      },
    },
    Price: {
      type: DataTypes.DECIMAL(19, 4),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: 'Price is not a valid decimal number',
        },
        min: {
          args: [1],
          msg: 'Price must be greater than or equal to 1',
        },
      },
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'the stock number must be a valid integer',
        },
        min: {
          args: [0],
          msg: 'Stock must be greater than  or equal to 0',
        },
      },
    },
    Likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'the number must be a valid integer',
        },
      },
    },
  }, {
    paranoid: true,
  });
  return Products;
};

