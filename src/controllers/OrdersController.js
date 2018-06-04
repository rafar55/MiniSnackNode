const orderService = require('../Services/OrderService');

const orderController = {};

orderController.GetAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.GetAllOrders();
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

orderController.BuyProduct = async (req, res, next) => {
  try {
    const { ProductId, Quantity } = req.body;
    const UserId = req.user.id;
    const order = await orderService.BuyAProduct(UserId, ProductId, Quantity);
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
};

module.exports = orderController;
