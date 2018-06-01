const db = require('../db');

const userService = {};


userService.getUsers = function GetUsuariosFromBase() {
  return db.dbContext.Users.findAll({
    include: [
      {
        model: db.dbContext.Roles,
        as: 'Roles',
        through: { attributes: [] },
      }],
  });
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
    include: [
      {
        model: db.dbContext.Roles,
        as: 'Roles',
        through: { attributes: [] },
      }],
  });
  // return new Promise((resolve, reject) => {
  //   db.connection.query('Select * from Users WHERE id=?', [idUsuario], (error, rows) => {
  //     const data = (rows.length > 0) ? rows[0] : null;
  //     db.processDatabaseData(reject, resolve, error, data);
  //   });
  // });
};


userService.GetUserByUsernameAndPassword = (username, password) => {
  return db.dbContext.Users.find({
    where: {
      username,
      password,
    },
    include: [
      {
        model: db.dbContext.Roles,
        as: 'Roles',
        through: { attributes: [] },
      }],
  });
};


userService.addUsuario = async function addUsuarioToSql(data) {
  const newUserData = data;
  let roles;
  if (data.Roles) {
    const RolNames = data.Roles;
    roles = await db.dbContext.Roles.findAll({
      where: {
        Name: RolNames,
      },
    });
    if (RolNames.length !== roles.length) {
      throw new db.sequelize.ValidationError('Some roles in the payload don\'t exists', [
        new db.sequelize.ValidationErrorItem('Some Roles  are invalid', 'string', 'Roles', data.Roles),
      ]);
    }
  }
  let newUser = await db.dbContext.Users.create(newUserData);
  if (roles) await newUser.setRoles(roles);
  newUser = await this.getUserById(newUser.id);
  return newUser;
};

userService.AddRolToUser = async function AddRolToUsuarioSql(UserId, RolName) {
  const user = await this.getUserById(UserId);

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

  if (user.Roles.findIndex(x => x.Name === rol.Name) !== -1) {
    throw new db.sequelize.ValidationError(`The user is already in this rol ${RolName}`, [
      new db.sequelize.ValidationErrorItem(`The user is already in this rol ${RolName}`, 'string', 'RoleName', RolName),
    ]);
  }

  await user.addRoles(rol);

  return this.getUserById(user.id);
};

module.exports = userService;
