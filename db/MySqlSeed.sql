INSERT INTO users (`username`, `password`, `email`,`createdAt`,`updatedAt`)
VALUES ('rafar55','enohp4407','rafar55@outlook.com',now(),now());

SET @userId = LAST_INSERT_ID();

INSERT INTO roles (`Name`,`createdAt`,`updatedAt`) VALUES ('admin',now(),now());

SET @roleId = LAST_INSERT_ID();

INSERT INTO usersroles (`UserId`, `RoleId`,`createdAt`,`updatedAt`)
VALUES (@userId,@roleId,now(),now())