const productService = require('../Services/ProductService');
const logger = require('../logger');

const GetProducts = async (req, res, next) => {
  logger.log('info', 'Request  get products controller');
  try {
    const query = req.params.q;
    const orderby = req.params.order || 'name';
    const productos = await productService.GetProducts(query, orderby);
    return res.json(productos);
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
    res.json(data);
  } catch (e) {
    next(e);
  }
};


module.exports = {
  GetProducts,
  GetProductsByID,
  AddNewProduct,
};
