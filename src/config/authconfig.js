

const passport = require('passport');
const passportJWT = require('passport-jwt');
const userService = require('../Services/UserService');
const config = require('./index');

const { ExtractJwt, JWTStrategy = passportJWT.Strategy } = passportJWT;


const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JwtSecret;

passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, done) => {
  console.log('Payload received', jwtPayload);
  const user = await userService.getUserById(jwtPayload.Id);
  if (!user) done(null, false);
  else done(null, user);
}));

const authorizeMiddleWare = roles => (req, res, next) => {
  const userRoles = req.account.Roles;
  const hasRol = userRoles.findIndex(usrRol => roles.findIndex(r => usrRol.Name === r) >= 0) !== -1;
  if (hasRol === false) {
    res.status(403).send('The user can\'t does not have permission to execute this action');
  } else {
    next();
  }
};

module.exports = {
  authorizeRoles: authorizeMiddleWare,
  passport,
};

