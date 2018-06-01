const logger = require('../logger');
const router = require('express').Router();
const userController = require('../controllers/UsersController');

const authConfig = require('../config/authconfig');

const { passport, authorizeRoles } = authConfig;

router.route('/')
  .get((req, res, next) => {
    logger.log('info', '/Users Request');
    userController.GetUserList(req, res, next);
  })
  .post(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      userController.AddUsuario(req, res, next);
    },
  );


router.route('/:id')
  .get((req, res, next) => {
    logger.log('/get user by id');
    userController.GetUserById(req, res, next);
  });

router.route('/:id/Roles')
  .put(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      userController.AddRolToUser(req, res, next);
    },
  );

module.exports = router;
