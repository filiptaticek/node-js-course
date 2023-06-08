const express = require("express")
const bodyParser = require("body-parser")
const adminRouter = require("./routes/admin")
const productRouter = require("./routes/product")
const controllers = require("./controllers/index")

const app = express()
app.use(bodyParser.urlencoded())
//parser used for parsing the body of the form request. Req.body would be undefined without it

app.use("/admin", adminRouter)
app.use("/product", productRouter)

app.use(controllers.defaultPage)

app.listen(3000)
