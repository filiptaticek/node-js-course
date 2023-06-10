const Sequelize = require("sequelize")
const env = require("dotenv").config()

const sequelize = new Sequelize(
  "node-complete",
  "root",
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
)

module.exports = sequelize
