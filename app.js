const express = require("express")
const bodyParser = require("body-parser")
const adminRouter = require("./routes/admin")
const productRouter = require("./routes/product")
const controllers = require("./controllers/index")
const db = require("./util/database")

const app = express()
app.use(bodyParser.urlencoded())
//parser used for parsing the body of the form request. Req.body would be undefined without it

db.execute("SELECT * FROM products")
  .then((result) => console.log("Alles gut! ", result[0]))
  .catch((err) => console.log("An error! ", err))

app.use("/admin", adminRouter)
app.use("/product", productRouter)

app.use(controllers.defaultPage)

app.listen(3000)
