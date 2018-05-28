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

module.exports = {
  GetProducts,
  GetProductById,
  AddProduct,
};

