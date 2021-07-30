
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: false,
  // pool: {
  //   max: process.env.pool.max,
  //   min: process.env.pool.min,
  //   acquire: process.env.pool.acquire,
  //   idle: process.env.pool.idle
  // }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../Modal/User")(sequelize, Sequelize);
db.Document = require("../Modal/Document")(sequelize, Sequelize);
db.Center = require("../Modal/Center")(sequelize, Sequelize);
db.Issue = require("../Modal/Issue")(sequelize, Sequelize);
db.ReasonCode = require("../Modal/ReasonCode")(sequelize, Sequelize);
db.SubCenter = require("../Modal/SubCenter")(sequelize, Sequelize);

module.exports = db;