const router = require('express').Router();
const authController = require('../controllers/AccountController');

/* POST login. */
router.post('/', (req, res, next) => {
  authController.Login(req, res, next);
});

module.exports = router;
