const { db } = require("./db2.js")
const Sequelize = require("sequelize")
const { STRING, UUID, UUIDV4, DataTypes } = Sequelize

const commonAttr = {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
}

const Member = db.define("member", {
  ...commonAttr,
  name: STRING(20),
  sponsorId: UUID,
})

const Facility = db.define("facility", {
  ...commonAttr,
  name: STRING(20),
})

const Booking = db.define("booking", {
  ...commonAttr,
  // Don't need to define the these FKs, "Through" command does it for you
  // bookerId: UUID,
  // facilityId: UUID,
})

Member.belongsTo(Member, { as: "sponsor" })
Member.hasMany(Member, { as: "sponsee", foreignKey: "sponsorId" })

// Booking.belongsTo(Member, { as: "booker" })
// Member.hasMany(Booking, { foreignKey: "bookerId" })
// Booking.belongsTo(Facility)
// Facility.hasMany(Booking)

// The following is a different approach using a "Through Table"
// The benefit is really powerful eager loading.
// All of these will work:
// Member.findAll({ include: Facility });
// Facility.findAll({ include: Member });
// Member.findAll({ include: Booking });
// Booking.findAll({include: Member})
// Booking.findAll({ include: Member });
// Booking.findAll({ include: Facility });
// Note I created a db2.js and seed2.js that connect to a
// separate database so I could experiment with both

// ****************************************************
// Begin New Code

Member.belongsToMany(Facility, {
  foreignKey: "bookerId",
  through: { model: Booking, as: "booker", unique: false },
})

Facility.belongsToMany(Member, {
  through: { model: Booking, unique: false },
})

Facility.hasMany(Booking)
Booking.belongsTo(Facility)
Booking.belongsTo(Member, { as: "booker" })
Member.hasMany(Booking, { foreignKey: "bookerId" })

// End New Code
// **************************************************

module.exports = {
  db,
  Member,
  Facility,
  Booking,
}

// db.sync({ force: true })
