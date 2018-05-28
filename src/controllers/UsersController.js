const userService = require('../Services/UserService');


const GetUserList = async (req, res, next) => {
  try {
    const data = await userService.getUsers();
    res.json(data);
  } catch (e) {
    next(e);
  }
};

const GetUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userService.getUserById(id);
    if (data) res.json(data);
    else res.status(404).send(`User with id ${id} doesn't exists`);
  } catch (e) {
    next(e);
  }
};

const AddUsuario = async (req, res, next) => {
  try {
    console.log(req.body);
    const usuario = await userService.addUsuario(req.body);
    res.json(usuario);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  GetUserList,
  GetUserById,
  AddUsuario,
};

