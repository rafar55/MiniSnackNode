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


const GetProductsPaginated = async (query = '', orderbystr = 'name asc', perpage = 100, page = 1) => {
  const orderByArr = orderbystr.split(' ');
  const wherequery = {
    Name: {
      [Op.like]: `%${query}%`,
    },
  };

  const count = await db.dbContext.Products.count({
    where: wherequery,
  });

  const calculatedoffset = perpage * (page - 1);

  const lista = await db.dbContext.Products.findAll({
    where: wherequery,
    offset: calculatedoffset,
    order: [
      orderByArr,
    ],
    limit: perpage,
    include: [{ model: db.dbContext.ProductsImages, as: 'Images' }],
  });

  return {
    Total: count,
    Data: lista,
  };
};

const DeleteProduct = async (productId) => {
  const product = await db.dbContext.Products.find({
    where: {
      id: productId,
    },
  });
  if (!product) throw new db.NotFoundEntityError('product', productId);

  return product.destroy();
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


const UpdatePriceForProduct = async (productId, newData) => {
  const product = await db.dbContext.Products.find({
    where: {
      id: productId,
    },
  });
  if (!product) throw new db.NotFoundEntityError('product', productId);
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

const UpdateStockForProduct = async (productId, stock) => {
  const product = await db.dbContext.Products.find({
    where: {
      id: productId,
    },
  });
  if (!product) throw new db.NotFoundEntityError('product', productId);

  await product.update({ Stock: stock });

  return product;
};

const AddLikeToProduct = async (productId) => {
  const product = await db.dbContext.Products.find({
    where: {
      id: productId,
    },
  });
  if (!product) throw new db.NotFoundEntityError('product', productId);

  const likes = product.Likes + 1;

  await product.update({ Likes: likes });

  return product;
};

module.exports = {
  GetProducts,
  GetProductsPaginated,
  GetProductById,
  AddProduct,
  UpdatePriceForProduct,
  UpdateStockForProduct,
  DeleteProduct,
  AddLikeToProduct,
};
