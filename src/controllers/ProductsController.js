const productService = require('../Services/ProductService');
const logger = require('../logger');
const Sequelize = require('sequelize');

// Este metodo me sirve para  validad y parsial el sort  query a un valor que entienda el servicio
function ParseOrderByString(orderbystr) {
  if (!orderbystr) return 'name asc';

  const strError = 'Invalid order by. Possible values name (default), -name, likes, -likes';
  switch (orderbystr.toLowerCase()) {
    case 'name':
      return 'name asc';
    case '-name':
      return 'name desc';
    case 'likes':
      return 'likes asc';
    case '-likes':
      return 'likes desc';
    default:
      throw new Sequelize.ValidationError(strError, [new Sequelize.ValidationErrorItem(strError, 'string', 'orderby', orderbystr)]);
  }
}


const GetProducts = async (req, res, next) => {
  logger.log('info', 'Request  get products controller');
  try {
    const query = req.query.q || '';
    const orderby = ParseOrderByString(req.query.sort) || 'name';
    const productos = await productService.GetProducts(query, orderby);
    res.json(productos);
  } catch (e) {
    next(e);
  }
};

const GetProductsByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.GetProductById(id);
    if (data) res.json(data);
    else res.status(404).send(`Product with id ${id} doesn't exists`);
  } catch (e) {
    next(e);
  }
};

const AddNewProduct = async (req, res, next) => {
  try {
    const data = await productService.AddProduct(req.body);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};

const UpdateProductPrice = async (req, res, next) => {
  try {
    const productoMod = await productService.UpdatePriceForProduct(req.params.id, req.body);
    res.status(200).json(productoMod);
  } catch (e) {
    next(e);
  }
};

const UpdateProductStock = async (req, res, next) => {
  try {
    const productoMod = await productService.UpdateStockForProduct(req.params.id, req.body.Stock);
    res.status(200).json(productoMod);
  } catch (e) {
    next(e);
  }
};


module.exports = {
  GetProducts,
  GetProductsByID,
  AddNewProduct,
  UpdateProductPrice,
  UpdateProductStock,
};
