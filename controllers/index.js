// All the controllers responsible for working with products

const Product = require("../models/product")

function adminGet(req, res, next) {
  /* We can make difference between app.get and app.post, app.use is for any request.
   The more specific middleware has to be first, otherwise it will never be reached */
  res.send(
    '<form method="POST" action="admin"><input type="text" name="title"></input><button type="submit">submit</button></form>  '
  )
}

function adminPost(req, res, next) {
  const product = new Product(req.body.title)
  product.save()
  res.redirect("/shop")
  console.log("Redirected man")
}

function shopGet(req, res, next) {
  const products = Product.fetchAll()
  res.send(`<p>Here is the list of our products: </p> 
  ${products.map((product) => `<li>${product.title}</li>`)}
  `)
}

function fourOhFour(req, res, next) {
  //catching all the uncatched
  res.send(`
    <button onclick="window.location.href='/admin'">Go to Admin</button>
    <button onclick="window.location.href='/shop'">Go to Shop</button>
  `)
}

module.exports = {
  adminGet,
  adminPost,
  shopGet,
  fourOhFour,
}
