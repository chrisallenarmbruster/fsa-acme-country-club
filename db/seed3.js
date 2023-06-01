const { db, Part, Supplier, CatalogItem } = require("./model3.js")
const { faker, fa } = require("@faker-js/faker")

function fakeProduct() {
  return {
    name: faker.commerce.productName(),
  }
}

function fakeSupplier() {
  return {
    name: faker.company.name(),
  }
}

function fakePrice() {
  return {
    price: faker.commerce.price() * 1,
  }
}

const syncAndSeed = async () => {
  try {
    console.log("starting database seeding process")
    await db.sync({ force: true })
    console.log("inserting records")

    for (let i = 0; i < 10; i++) {
      await Part.create(fakeProduct())
    }

    await Part.create({ ...fakeProduct(), assemblyId: 1 })
    await Part.create({ ...fakeProduct(), assemblyId: 1 })
    await Part.create({ ...fakeProduct(), assemblyId: 1 })
    await Part.create({ ...fakeProduct(), assemblyId: 1 })
    await Part.create({ ...fakeProduct(), assemblyId: 2 })
    await Part.create({ ...fakeProduct(), assemblyId: 11 })
    await Part.create({ ...fakeProduct(), assemblyId: 11 })
    await Part.create({ ...fakeProduct(), assemblyId: 3 })
    await Part.create({ ...fakeProduct(), assemblyId: 16 })

    for (let i = 0; i < 10; i++) {
      await Supplier.create(fakeSupplier())
    }

    const products = await Part.findAll()
    const suppliers = await Supplier.findAll()

    for (product of products) {
      for (supplier of suppliers) {
        await CatalogItem.create({
          partId: product.id,
          makerId: supplier.id,
          ...fakePrice(),
        })
      }
    }

    await db.close()
    console.log("database seeding complete")
  } catch (error) {
    console.log(error)
    db.close()
  }
}
syncAndSeed()
