const logger = require('../logger');
const router = require('express').Router();
const ordersController = require('../controllers/OrdersController');
const authConfig = require('../config/authconfig');


router.route('/')
  .post(
    authConfig.passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      logger.log('info', 'Post /Orders adding new order');
      ordersController.BuyProduct(req, res, next);
    },
  )
  .get(
    authConfig.passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      logger.log('info', 'Get /Orders get all orders');
      ordersController.GetAllOrders(req, res, next);
    },
  );

module.exports = router;
