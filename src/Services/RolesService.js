const db = require('../db');

const roleService = {};

roleService.GetAllRoles = () => db.dbContext.Roles.findAll();

roleService.AddRol = rolName => db.dbContext.Roles.create({
  Name: rolName,
});

roleService.DeleteRol = async (rolId) => {
  const rol = await db.dbContext.Roles.find({
    where: {
      Id: rolId,
    },
  });
  if (!rol) throw new db.NotFoundEntityError('roles', rolId);

  await rol.destroy();
};

module.exports = roleService;
