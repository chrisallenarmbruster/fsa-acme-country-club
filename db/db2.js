const { Sequelize, STRING, INTEGER } = require("sequelize")

const db = new Sequelize(`postgres://localhost/acme-country-club-db2`, {
  logging: false,
})
async function authenticate() {
  try {
    await db.authenticate()
    console.log(
      `connection to db has been established successfully: acme-country-club-db2`
    )
  } catch (error) {
    console.error(`unable to connect to db:`, error)
    db.close()
  }
}
authenticate()
module.exports = { db, STRING, INTEGER }
