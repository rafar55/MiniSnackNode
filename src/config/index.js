const devConfig = require('./devconfig.json');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    MySQL: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPassword,
      database: process.env.dbName,
    },
  };
} else {
  module.exports = devConfig;
}
