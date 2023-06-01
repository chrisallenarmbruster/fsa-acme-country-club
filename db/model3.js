const { db } = require("./db.js")
const Sequelize = require("sequelize")
const { STRING, UUID, UUIDV4, INTEGER, DECIMAL, BOOLEAN, ENUM, DataTypes } =
  Sequelize

const Part = db.define("part", {
  name: STRING(50),
})

const Supplier = db.define("supplier", {
  name: STRING(50),
})

const CatalogItem = db.define("catalog_item", {
  price: DECIMAL(10, 2),
})

Part.belongsTo(Part, { as: "assembly", foreignKey: "assemblyId" })
Part.hasMany(Part, { as: "components", foreignKey: "assemblyId" })
Part.hasMany(CatalogItem)
CatalogItem.belongsTo(Part)
Supplier.hasMany(CatalogItem, { foreignKey: "makerId" })
CatalogItem.belongsTo(Supplier, { as: "maker", foreignKey: "makerId" })

async function sync() {
  try {
    await db.sync({ force: true })
    await db.close()
    console.log("db synced!")
  } catch (err) {
    console.log(err)
  }
}

// sync()

module.exports = {
  db,
  Part,
  Supplier,
  CatalogItem,
}
