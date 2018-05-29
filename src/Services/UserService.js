const db = require('../db');

const userService = {};


userService.getUsers = function GetUsuariosFromBase() {
  return db.dbContext.Users.findAll();
  // return new Promise((resolve, reject) => {
  //   db.connection.query('Select * FROM Users ORDER BY ID DESC', (error, rows) => {
  //     db.processDatabaseData(reject, resolve, error, rows);
  //   });
  // });
};

userService.getUserById = function GetUsuarioById(idUsuario) {
  return db.dbContext.Users.findOne({
    where: {
      id: idUsuario,
    },
  });
  // return new Promise((resolve, reject) => {
  //   db.connection.query('Select * from Users WHERE id=?', [idUsuario], (error, rows) => {
  //     const data = (rows.length > 0) ? rows[0] : null;
  //     db.processDatabaseData(reject, resolve, error, data);
  //   });
  // });
};

userService.addUsuario = async function addUsuarioToSql(data) {
  const newUserData = data;
  if (data.Roles) {
    const RolNames = data.Roles;
    const roles = await db.dbContext.Roles.findAll({
      where: {
        Name: RolNames,
      },
    });


    if (RolNames.length !== roles.length) {
      throw new db.sequelize.ValidationError('Some roles in the payload don\'t exists', [
        new db.sequelize.ValidationErrorItem('Some Roles  are invalid', 'string', 'Roles', data.Roles),
      ]);
    }

    newUserData.Roles = data;
  }
  return db.dbContext.Users.create(newUserData, {
    include: [{
      model: db.dbContext.Roles,
      as: 'Roles',
    }],
  });
};

userService.AddRolToUser = async function AddRolToUsuarioSql(UserId, RolName) {
  const user = await db.dbContext.Users.find({
    where: { id: UserId },
  });

  if (!user) {
    throw new db.sequelize.ValidationError('UserID is not valid. It doesn\'t exists', [
      new db.sequelize.ValidationErrorItem('UserId is not valid. It doesn\'t exists', 'string', 'UserId', UserId),
    ]);
  }

  const rol = await db.dbContext.Roles.find({
    where: { Name: RolName },
  });

  if (!rol) {
    throw new db.sequelize.ValidationError('RolName is not valid. It doesn\'t exists', [
      new db.sequelize.ValidationErrorItem('RoleName is not valid. It doesn\'t exists', 'string', 'RoleName', RolName),
    ]);
  }

  user.addRol(rol);

  return user;
};

module.exports = userService;
