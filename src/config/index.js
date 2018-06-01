const devConfig = require('./devconfig.json');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    MySQL: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPassword,
      database: process.env.dbName,
    },
    JwtSecret: 'COH2',
  };
} else {
  module.exports = devConfig;
}
