const session = require("express-session");
const MyStorage = require("express-mysql-session")(session);

const options = {
  host: "localhost",
  user: "root",
  password: "soytk",
  port: 3306,
  database: "my_users",
};

const storage = new MyStorage(options);

module.exports = storage;
