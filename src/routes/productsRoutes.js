const logger = require('../logger');
const router = require('express').Router();
const productsController = require('../controllers/ProductsController');
const authConfig = require('../config/authconfig');

const { passport, authorizeRoles } = authConfig;

router.route('/')
  .get((req, res, next) => {
    logger.log('info', 'Get');
    productsController.GetProducts(req, res, next);
  }).post(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      productsController.AddNewProduct(req, res, next);
    },
  );


router.route('/:id')
  .get((req, res, next) => {
    logger.log('/get product by id');
    productsController.GetProductsByID(req, res, next);
  })
  .delete(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      logger.info('Delete request for product');
      productsController.DeleteProduct(req, res, next);
    },
  );

router.route('/:id/price')
  .put(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      productsController.UpdateProductPrice(req, res, next);
    },
  );

router.route('/:id/stock')
  .put(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      productsController.UpdateProductStock(req, res, next);
    },
  );

router.route('/:id/like')
  .put(
    passport.authorize('jwt', { session: false }),
    (req, res, next) => {
      productsController.LikeProduct(req, res, next);
    },
  );

module.exports = router;
