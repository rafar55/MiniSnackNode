# MiniSnackNode
REST API to manage a small snacks store using NodeJS.

# How to run

1. First you need  to change the **src/config/devconfig.json** to match your mySql configuration. You also need to create a new MySql schema.
```json
{
    "MySQL" : {
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "nodeapirest"
    }
}
```
1. You need to run the app using the command **node src/app**. When you run this command the database  will be generated automatically
sequalize.
1. After the app is  running, you need to execute the seed Sql located at **db/MySqlSeed.sql** on the database that was recently created.

Your  are all set yo test the Rest Api.

# Frameworks
* ExpressJs [ExpressJs Documentation](https://expressjs.com/)
* PassportJs [PassportJs Documentation](http://www.passportjs.org)
* Sequelizejs (ORM) [SequelizeJs Documentation](http://docs.sequelizejs.com/)
