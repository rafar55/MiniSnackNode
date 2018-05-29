const logger = require('../logger');
const router = require('express').Router();
const productsController = require('../controllers/ProductsController');

router.route('/')
  .get((req, res, next) => {
    logger.log('info', 'Get');
    productsController.GetProducts(req, res, next);
  }).post((req, res, next) => {
    productsController.AddNewProduct(req, res, next);
  });


router.route('/:id')
  .get((req, res, next) => {
    logger.log('/get product by id');
    productsController.GetProductsByID(req, res, next);
  })
  .delete((req, res, next) => {
    logger.info('Delete request for product');
    productsController.DeleteProduct(req, res, next);
  });

router.route('/:id/price')
  .put((req, res, next) => {
    productsController.UpdateProductPrice(req, res, next);
  });

router.route('/:id/stock')
  .put((req, res, next) => {
    productsController.UpdateProductStock(req, res, next);
  });

module.exports = router;
