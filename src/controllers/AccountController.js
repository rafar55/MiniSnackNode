const userService = require('../Services/UserService');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const accountController = {};

accountController.Login = async (req, res, next) => {
  try {
    const user = await userService
      .GetUserByUsernameAndPassword(req.body.username, req.body.password);

    if (!user) {
      res.status(401).json({ message: 'user or password is invalid!' });
    } else {
      const userSerializable = {
        Id: user.id,
        UserName: user.username,
        Roles: user.Roles.map(x => x.Na0me),
      };
      const token = jwt.sign(userSerializable, config.JwtSecret);
      res.json({ message: 'ok', token });
    }
  } catch (e) {
    next(e);
  }
};


module.exports = accountController;

