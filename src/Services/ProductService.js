const db = require('../db');
const Sequelize = require('sequelize');


const { Op } = Sequelize;

const GetProducts = (query = '', orderbystr = 'name asc') => {
  const orderByArr = orderbystr.split(' ');
  return db.dbContext.Products.findAll({
    where: {
      Name: {
        [Op.like]: `%${query}%`,
      },
    },
    order: [
      orderByArr,
    ],
    include: [{ model: db.dbContext.ProductsImages, as: 'Images' }],
  });
};


const GetProductById = idProducto => db.dbContext.Products.findOne({
  where: {
    id: idProducto,
  },
  include: [{ model: db.dbContext.ProductsImages, as: 'Images' }],
});

const AddProduct = async (data) => {
  const newProduct = await db.dbContext.Products.create(data, {
    include: [{
      model: db.dbContext.ProductsImages,
      as: 'Images',
    }],
  });
  return newProduct;
};


const UpdatePriceForProduct = async (idProducto, newData) => {
  const product = await db.dbContext.Products.find({
    where: {
      id: idProducto,
    },
  });
  if (!product) throw new db.NotFoundEntityError('product', idProducto);
  const previousPrice = product.Price;

  // Creo una transaccion en la base par hacer el update y agregar al historico
  const recienInsertado = await db.sequelize.transaction(async (t) => {
    await product.update({ Price: newData.Price }, { transaction: t });
    await db.dbContext.ProductPriceHistory.create({
      NewPrice: product.Price,
      OldPrice: previousPrice,
      ProdutcId: product.id,
    }, { transaction: t });
    return product;
  });

  return recienInsertado;
};

const UpdateStockForProduct = async (idProducto, stock) => {
  const product = await db.dbContext.Products.find({
    where: {
      id: idProducto,
    },
  });
  if (!product) throw new db.NotFoundEntityError('product', idProducto);

  await product.update({ Stock: stock });

  return product;
};

module.exports = {
  GetProducts,
  GetProductById,
  AddProduct,
  UpdatePriceForProduct,
  UpdateStockForProduct,
};
