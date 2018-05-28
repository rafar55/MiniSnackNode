

module.exports = (sequelize, DataTypes) => {
  const ProductImages = sequelize.define('ProdutcsImages', {
    ImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 1,
          msg: 'The image url is required',
        },
        isUrl: { msg: 'The imageurl is not a valid Url' },
      },
    },
  });

  return ProductImages;
};

