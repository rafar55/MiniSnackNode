const logger = require('../logger');
const router = require('express').Router();
const rolesController = require('../controllers/RolesController');

router.route('/')
  .get((req, res, next) => {
    logger.log('info', '/Users Request');
    rolesController.GetRoles(req, res, next);
  })
  .post((req, res, next) => {
    rolesController.AddNewRol(req, res, next);
  });


router.route('/:id')
  .delete((req, res, next) => {
    logger.log('/get user by id');
    rolesController.DeleteRol(req, res, next);
  });


module.exports = router;
