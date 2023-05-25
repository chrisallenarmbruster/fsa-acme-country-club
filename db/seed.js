const { db, Member, Facility, Booking } = require("./model.js")

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true })

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
        name: "moe",
        sponserId: lucy.id,
      }),
      Member.create({
        name: "larry",
        sponserId: lucy.id,
      }),
    ])

    const [ethyl] = await Promise.all([
      Member.create({
        name: "ethyl",
        sponserId: moe.id,
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
        bookerId: moe.id,
        facilityId: tennis.id,
      }),
    ])
  } catch (error) {
    console.log(error)
    db.close()
  }
}
syncAndSeed()
