const Sequelize = require('sequelize');
const config = require('./config');
const logger = require('./logger');
const UserModel = require('./models/Users');
const ProductModel = require('./models/Products');
const ProductImagesModel = require('./models/ProdutcsImages');
const ProductPriceHistoryModel = require('./models/ProductPriceHistory');

const sequelize = new Sequelize(config.MySQL.database, config.MySQL.user, config.MySQL.password, {
  host: config.MySQL.host,
  dialect: 'mysql',
});

// Start the connection
sequelize.authenticate()
  .then(() => logger.log('info', 'error  al conectar con la base de mysql'))
  .catch(e => logger.log('error', `error  al conectar con la base de mysql ${e}`));

// Model Configuration
const Users = sequelize.import('Users', UserModel);
const Products = sequelize.import('Products', ProductModel);
const ProductsImages = sequelize.import('ProductsImages', ProductImagesModel);
const ProductPriceHistory = sequelize.import('ProductsPriceHistory', ProductPriceHistoryModel);

// Mapppings Relations Asociations
Products.hasMany(ProductsImages, { as: 'Images', onDelete: 'CASCADE' });
Products.hasMany(ProductPriceHistory, { as: 'PriceHistory', onDelete: 'CASCADE' });

// sequelize syncronization
sequelize.sync({ force: true })
  .then(() => logger.log('info', 'base de datos creada con existo'))
  .catch(err => logger.log('error', `Error al sync la base ${err}`));

const processDatabaseData = (reject, resolve, error, rows) => {
  if (error) {
    logger.log('error', error);
    reject();
  } else {
    resolve(rows);
  }
};

const to = function to(promise) {
  return promise.then(data => [null, data])
    .catch(err => [err]);
};

class NotFoundEntityError extends Error {
  constructor(entity, value) {
    super(`A value for ${entity} with Id ${value} was not found`);
    this.name = 'NotFoundError';
    this.entity = entity;
    this.value = value;
  }
}

module.exports = {
  dbContext: {
    Users,
    Products,
    ProductsImages,
    ProductPriceHistory,
  },
  processDatabaseData,
  awaitHelper: to,
  NotFoundEntityError,
  sequelize,
};
