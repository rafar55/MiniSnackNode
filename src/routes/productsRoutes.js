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
  });

module.exports = router;
