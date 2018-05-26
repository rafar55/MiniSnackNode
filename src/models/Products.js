module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Produtcs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
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
        len: {
          args: 1,
          msg: 'The password is required.',
        },
      },
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: 'The email is required.',
        },
        isEmail: { msg: 'Invalid email address.' },
      },
    },
  }, {
    paranoid: true,
  });
  return Products;
};

