const { db } = require("./db.js")
const Sequelize = require("sequelize")
const { STRING, UUID, UUIDV4, DataTypes } = Sequelize

const commonAttr = {
  id: {
    type: UUID,
    primaryKey: true,
    //default value is needed for Sequelize to automatically create the UUID primary key
    defaultValue: UUIDV4,
  },
}

const Member = db.define("member", {
  ...commonAttr,
  name: STRING(20),
  sponserId: UUID,
})

const Facility = db.define("facility", { ...commonAttr, name: STRING(20) })

const Booking = db.define("booking", {
  ...commonAttr,
  bookerId: UUID,
  facilityId: UUID,
})

Member.belongsTo(Member, { as: "sponser" })
Member.hasMany(Member, { as: "sponsee", foreignKey: "sponserId" })

Booking.belongsTo(Member, { as: "booker" })
Member.hasMany(Booking, { foreignKey: "bookerId" })

Booking.belongsTo(Facility)
Facility.hasMany(Booking)

module.exports = {
  db,
  Member,
  Facility,
  Booking,
}

//db.sync({force: true})
