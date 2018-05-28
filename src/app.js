const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const logger = require('./logger');
const Sequelize = require('sequelize');
const compression = require('compression');

const userRoutes = require('./routes/userRoutes');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

// settings
const port = process.env.PORT || 3000;
app.set('port', port);

// middleware
app.use(compression());
app.use(express.static(path.join(process.cwd(), 'pubic')));
app.use(bodyParser.json());
app.use(morgan('combined'));


// Global Error Handler Middleware

// /routes configurations
app.use('/users', userRoutes);
app.use('/products', productsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  logger.log('error', err);
  if (err instanceof Sequelize.ValidationError) {
    const errors = err.errors.map(x => ({ message: x.message, property: x.path }));
    res.status(400).send(errors);
  } else {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(app.get('port'), () => {
  console.log(`server on port ${port}`);
});
