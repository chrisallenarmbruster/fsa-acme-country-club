//if there is an index.js file at this path, it will use it by default.
//exporting STRING, INTEGER with db from other file so we don't need to require sequelize again
const { db, STRING, INTEGER } = require("./db.js")

//define models
const Person = db.define("Person", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
})

const Thing = db.define("Thing", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
})

const Place = db.define("Place", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true },
  },
})

const Souvenir = db.define("Souvenir", {})

//define relationships
Person.hasMany(Souvenir)
Souvenir.belongsTo(Person)
Place.hasMany(Souvenir)
Souvenir.belongsTo(Place)
Thing.hasMany(Souvenir)
Souvenir.belongsTo(Thing)

async function dbModelSync() {
  await db.sync({ force: true })
  console.log("all models were synchronized successfully.")
}

module.exports = { db, Person, Thing, Place, Souvenir, dbModelSync } //don't forget to export your models
