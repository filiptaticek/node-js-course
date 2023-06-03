const express = require("express")

const app = express()

app.use((req, res, next) => {
  console.log("In the middleware! ")
  next() //only if we call this next function, other middlewares may be run
})

app.use((req, res, next) => {
  res.send("<p>Hello from Express </p>")
})

app.listen(3000)
