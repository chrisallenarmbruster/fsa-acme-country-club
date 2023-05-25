const router = require("express").Router()
const { db, Member, Facility, Booking } = require("../db/model2.js")
// const { mainView } = require("../views")

router.get("/facilities", async (req, res, next) => {
  try {
    const facilities = await Facility.findAll({
      attributes: ["name"],
      include: [
        {
          model: Booking,
          attributes: ["id"],
          include: [
            {
              model: Member,
              as: "booker",
              attributes: ["name"],
            },
          ],
        },
      ],
    })

    res.json(facilities)
  } catch (error) {
    error.message = "database query failed on GET / route"
    next(error)
  }
})

router.get("/bookings", async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      attributes: ["id"],
      include: [
        {
          model: Member,
          as: "booker",
          attributes: ["name"],
        },
        {
          model: Facility,
          attributes: ["name"],
        },
      ],
    })

    res.json(bookings)
  } catch (error) {
    error.message = "database query failed on GET / route"
    next(error)
  }
})

router.get("/members", async (req, res, next) => {
  try {
    const members = await Member.findAll({
      attributes: ["name", "id"],
      include: [
        { model: Member, as: "sponsor", attributes: ["name", "id"] },
        { model: Member, as: "sponsee", attributes: ["name", "id"] },
      ],
    })

    res.json(members)
  } catch (error) {
    error.message = "database query failed on GET / route"
    next(error)
  }
})

console.log(
  `Router 2: API routes for http://localhost:1337/api2 set up, try /facilities, /bookings and /members`
)

module.exports = router
