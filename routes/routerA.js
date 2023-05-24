const router = require("express").Router()
const { Person, Thing, Place, Souvenir } = require("../db")
// const { mainView } = require("../views")

router.get("/", async (req, res, next) => {
  try {
    const [people, places, things, souvenirs] = await Promise.all([
      Person.findAll(),
      Place.findAll(),
      Thing.findAll(),
      Souvenir.findAll({
        include: [Person, Place, Thing],
      }),
    ])

    res.send(mainView(people, places, things, souvenirs))
  } catch (error) {
    error.message = "database query failed on GET / route"
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    await Souvenir.create(req.body)

    res.redirect("/")
    // res.json(req.body)
  } catch (error) {
    error.message = "database query failed on POST / route"
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const souvenir = await Souvenir.findByPk(req.params.id)

    if (souvenir) await souvenir.destroy()

    res.redirect("/")
    // res.json(req.body)
  } catch (error) {
    error.message = "database query failed on DELETE / route"
    next(error)
  }
})

module.exports = router
