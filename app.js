const express = require("express")
const bodyParser = require("body-parser")
const adminRouter = require("./routes/admin")
const shopRouter = require("./routes/shop")
const controllers = require("./controllers/index")

const app = express()
app.use(bodyParser.urlencoded()) //parser used for parsing the body of the form request. Req.body would be undefined without it

app.use("/admin", adminRouter)
app.use("/shop", shopRouter)

app.use(controllers.fourOhFour)

app.listen(3000)
