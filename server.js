const express = require("express")
const morgan = require("morgan")
// const override = require("method-override")
const { routerA: router } = require("./routes")

const app = express()
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.static(__dirname + "/public"))
// app.use(override("_method"))

app.use("/", router)

const PORT = 1337

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500).send(err.message)
})

app.listen(PORT, () => {
  console.log(`app listening in port ${PORT}`)
})
