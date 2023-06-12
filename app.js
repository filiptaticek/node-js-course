const express = require("express")
const bodyParser = require("body-parser")
const productRouter = require("./routes/product")
const cartRouter = require("./routes/cart")
const controllers = require("./controllers/index")
const sequelize = require("./util/database")
const Product = require("./models/product")
const User = require("./models/user")
const CartItem = require("./models/cartItem")
const Cart = require("./models/cart")

const app = express()
app.use(bodyParser.urlencoded()) //parser used for parsing the body of the req.body.
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((e) => console.log(e))
})

app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use(controllers.defaultPage) //default page

Product.belongsTo(User, { constrains: true, onDelete: "CASCADE" }) //once  the user is deleted, so is the product
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

sequelize
  .sync() //this function writes all of the sequelize models by default into the database
  .then((result) => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({ id: 1, username: "karel", email: "@gmail.com" })
    }
    return user
  })
  .then((user) => {
    user.createCart() //creating a cart straight away
  })
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log("Error:", err))
