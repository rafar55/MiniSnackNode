const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const logger = require('./logger');
const Sequelize = require('sequelize');
const compression = require('compression');


const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');
const rolRoutes = require('./routes/rolesRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const db = require('./db');
const authconfig = require('./config/authconfig');

const app = express();

// settings
const port = process.env.PORT || 3000;
app.set('port', port);

// middleware
app.use(compression());
app.use(express.static(path.join(process.cwd(), 'pubic')));
app.use(bodyParser.json());
app.use(morgan('combined'));

// Configure authentication middleware
app.use(authconfig.passport.initialize());

// /routes configurations
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use('/roles', rolRoutes);
app.use('/orders', orderRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  logger.log('error', err);
  if (err instanceof Sequelize.ValidationError) {
    let errors = err.errors.map(x => ({ message: x.message, property: x.path }));
    errors = errors || 'bad request';
    res.status(400).send(errors);
  } else if (err instanceof db.NotFoundEntityError) {
    res.status(404).send(err.message);
  } else if (err instanceof SyntaxError) {
    res.status(err.statusCode).send(err.message);
  } else {
    logger.log('error', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(app.get('port'), () => {
  console.log(`server on port ${port}`);
});
