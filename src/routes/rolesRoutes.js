const logger = require('../logger');
const router = require('express').Router();
const rolesController = require('../controllers/RolesController');
const authConfig = require('../config/authconfig');

const { passport, authorizeRoles } = authConfig;

router.route('/')
  .get((req, res, next) => {
    logger.log('info', '/Users Request');
    rolesController.GetRoles(req, res, next);
  })
  .post(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      rolesController.AddNewRol(req, res, next);
    },
  );


router.route('/:id')
  .delete(
    passport.authorize('jwt', { session: false }),
    authorizeRoles(['admin']),
    (req, res, next) => {
      logger.log('/get user by id');
      rolesController.DeleteRol(req, res, next);
    },
  );


module.exports = router;
