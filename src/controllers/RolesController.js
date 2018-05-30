const rolService = require('../Services/RolesService');


const GetRoles = async (req, res, next) => {
  try {
    const roles = await rolService.GetAllRoles();
    res.status(200).json(roles);
  } catch (e) {
    next(e);
  }
};

const AddNewRol = async (req, res, next) => {
  try {
    if (!req.body.Name) {
      res.status(400).send({
        message: 'The Name is require and must be at  least 3 characters',
        property: 'Name',
      });
    }
    const newRol = await rolService.AddRol(req.body.Name);
    res.status(201).json(newRol);
  } catch (e) {
    next(e);
  }
};

const DeleteRol = async (req, res, next) => {
  try {
    await rolService.DeleteRol(req.params.id);
    res.status(204).send(null);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  AddNewRol,
  DeleteRol,
  GetRoles,
};

