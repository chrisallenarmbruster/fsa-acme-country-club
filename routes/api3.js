const router = require("express").Router()
const { db, Part, Supplier, CatalogItem } = require("../db/model3.js")

router.get("/suppliers", async (req, res, next) => {
  try {
    const suppliers = await Supplier.findAll({
      attributes: ["name"],
      include: [
        {
          model: CatalogItem,
          attributes: ["price"],
          include: [
            {
              model: Part,
              attributes: ["name"],
              include: [{ model: Part, as: "assembly", attributes: ["name"] }],
            },
          ],
        },
      ],
      order: [
        ["name", "ASC"],
        [{ model: CatalogItem }, "price", "DESC"],
      ],
    })
    res.json(suppliers)
  } catch (error) {
    next(error)
  }
})

router.get("/catalogitems", async (req, res, next) => {
  try {
    const catalogitems = await CatalogItem.findAll({
      attributes: ["id", "price"],
      include: [
        {
          model: Part,
          attributes: ["name"],
          include: [{ model: Part, as: "assembly", attributes: ["name"] }],
        },
        { model: Supplier, as: "maker", attributes: ["name"] },
      ],
      order: [
        [{ model: Supplier, as: "maker" }, "name"],
        ["price", "DESC"],
      ],
    })
    res.json(catalogitems)
  } catch (error) {
    next(error)
  }
})

router.get("/parts", async (req, res, next) => {
  try {
    const parts = await Part.findAll({
      attributes: ["name", "id"],
      include: [
        { model: Part, as: "assembly", attributes: ["name", "id"] },
        { model: Part, as: "components", attributes: ["name", "id"] },
      ],
    })
    res.json(parts)
  } catch (error) {
    next(error)
  }
})
console.log(
  `Router 3: API routes for http://localhost:1337/api3 set up, try /suppliers, /parts and /catalogitems`
)

module.exports = router
