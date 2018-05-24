const db = require('../db');

const userService = {};


userService.getUsers = function GetUsuariosFromBase(qstr) {
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
  const newUser = db.dbContext.Users.build(data);
  await newUser.save();
  return newUser;
};

module.exports = userService;
