const logger = require('../logger');
const router = require('express').Router();
const userController = require('../controllers/UsersController');

router.route('/')
  .get((req, res, next) => {
    logger.log('info', '/Users Request');
    userController.GetUserList(req, res, next);
  })
  .post((req, res, next) => {
    userController.AddUsuario(req, res, next);
  });


router.route('/:id')
  .get((req, res, next) => {
    logger.log('/get user by id');
    userController.GetUserById(req, res);
  });



module.exports = router;
