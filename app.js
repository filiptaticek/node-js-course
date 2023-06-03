const express = require("express")
const bodyParser = require("body-parser")
const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")

const app = express()
app.use(bodyParser.urlencoded()) //parser used for parsing the body of the form request. Req.body would be undefined without it

app.use("/admin", adminData.router)
app.use("/shop", shopRoutes)

app.use((req, res, next) => {
  //catching all the uncatched
  res.send(`
    <button onclick="window.location.href='/admin'">Go to Admin</button>
    <button onclick="window.location.href='/shop'">Go to Shop</button>
  `)
})

app.listen(3000)
