const { db, Person, Thing, Place, Souvenir, dbModelSync } = require("./") //don't forget to import the models

const data = {
  people: ["moe", "larry", "lucy", "ethyl"],
  places: ["paris", "nyc", "chicago", "london"],
  things: ["hat", "bag", "shirt", "cup"],
  souvenirs: [
    { person: "moe", thing: "hat", place: "london" },
    { person: "moe", thing: "bag", place: "paris" },
    { person: "ethyl", thing: "shirt", place: "nyc" },
  ],
}

async function syncAndSeed() {
  try {
    await dbModelSync()
    console.log("starting seed process")
    await Promise.all(
      data.people.map(async (person) => await Person.create({ name: person }))
    )
    await Promise.all(
      data.places.map(async (place) => await Place.create({ name: place }))
    )
    await Promise.all(
      data.things.map(async (thing) => await Thing.create({ name: thing }))
    )
    await Promise.all(
      data.souvenirs.map(async (souvenir) => {
        const personId = (
          await Person.findOne({
            where: { name: souvenir.person },
          })
        ).id
        const placeId = (
          await Place.findOne({
            where: { name: souvenir.place },
          })
        ).id
        const thingId = (
          await Thing.findOne({
            where: { name: souvenir.thing },
          })
        ).id
        console.log(personId, placeId, thingId)

        await Souvenir.create({
          PersonId: personId,
          PlaceId: placeId,
          ThingId: thingId,
        })
      })
    )

    console.log("seeding complete")
    db.close()
  } catch (error) {
    console.error(error)
    db.close()
  }
}

syncAndSeed()
