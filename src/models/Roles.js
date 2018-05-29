module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'rolUnique',
      validate: {
        len: {
          args: 1,
          msg: 'The rol is require and must be at  least 3 characters',
        },
      },
      set(val) {
        this.setDataValue('Name', val.toString().toLowerCase());
      },
    },
  });

  return Roles;
};
