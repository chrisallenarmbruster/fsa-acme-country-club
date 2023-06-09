const { db, Member, Facility, Booking } = require("./model.js")

const syncAndSeed = async () => {
  try {
    console.log("starting database seeding process")
    await db.sync({ force: true })
    console.log("inserting records")
    const [tennis, pingPong, marbles] = await Promise.all([
      Facility.create({
        name: "Tennis",
      }),
      Facility.create({
        name: "Ping Pong",
      }),
      Facility.create({
        name: "Marbles",
      }),
    ])

    const [lucy] = await Promise.all([
      Member.create({
        name: "Lucy",
      }),
    ])

    const [moe, larry] = await Promise.all([
      Member.create({
        name: "Moe",
        sponsorId: lucy.id,
      }),
      Member.create({
        name: "Larry",
        sponsorId: lucy.id,
      }),
    ])

    const [ethyl] = await Promise.all([
      Member.create({
        name: "Ethyl",
        sponsorId: moe.id,
      }),
    ])

    await Promise.all([
      Booking.create({
        bookerId: lucy.id,
        facilityId: marbles.id,
      }),
      Booking.create({
        bookerId: lucy.id,
        facilityId: marbles.id,
      }),
      Booking.create({
        bookerId: lucy.id,
        facilityId: tennis.id,
      }),
      Booking.create({
        bookerId: moe.id,
        facilityId: tennis.id,
      }),
    ])
    db.close()
    console.log("database seeding complete")
  } catch (error) {
    console.log(error)
    db.close()
  }
}
syncAndSeed()
