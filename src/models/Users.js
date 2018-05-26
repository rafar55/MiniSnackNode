module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: 'The username is required.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: 'The password is required.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'emailUnique',
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
  return Users;
};
