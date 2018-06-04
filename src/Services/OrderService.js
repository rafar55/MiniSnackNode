const db = require('../db');

const ordersService = {};


ordersService.GetAllOrders = () => db.dbContext.Orders.findAll({
  include: [
    {
      model: db.dbContext.Users,
      as: 'User',
    },
    {
      model: db.dbContext.Products,
      as: 'Product',
    },
  ],
});


ordersService.BuyAProduct = async (userIDBuyer, productId, quantity) => {
  const errors = [];
  if (productId === undefined) {
    const errorMesage = 'ProductId is required';
    errors.push(new db.sequelize.ValidationErrorItem(errorMesage, 'string', 'ProductId', productId));
  }

  if (quantity === undefined) {
    const errorMesage = 'Quantity is required';
    errors.push(new db.sequelize.ValidationErrorItem(errorMesage, 'string', 'Quantity', quantity));
  }

  if (errors.length > 0) {
    throw new db.sequelize.ValidationError('', errors);
  }
  const user = await db.dbContext.Users.find({
    where: {
      id: userIDBuyer,
    },
  });

  if (!user) throw new db.NotFoundEntityError('Users', userIDBuyer);

  const product = await db.dbContext.Products.find({
    where: {
      id: productId,
    },
  });


  if (!product) {
    throw new db.NotFoundEntityError('Products', productId);
  }


  if (product.Stock < quantity) {
    const errorMesage = `There is not enough stock quantity to process a purchase  of ${quantity}  for the product with id ${productId}`;
    throw new db.sequelize.ValidationError(errorMesage, [new db.sequelize.ValidationErrorItem(errorMesage, 'string', 'ProductId', productId)]);
  }

  // IF  al validation pass I Create a Transaction to add the new Order.
  const order = await db.sequelize.transaction(async (t) => {
    const newOrder = await db.dbContext.Orders.create({
      UserId: userIDBuyer,
      ProductId: productId,
      Quantity: quantity,
    }, { transaction: t });

    const currentStock = product.Stock - quantity;
    await product.update({ Stock: currentStock }, { transaction: t });

    return newOrder;
  });

  return order;
};

module.exports = ordersService;
