// All the controllers responsible for working with products

const Product = require("../models/product")

function adminGet(req, res) {
  /* We can make difference between app.get and app.post, app.use is for any request.
   The more specific middleware has to be first, otherwise it will never be reached */
  res.send(
    '<form method="POST" action="admin"><input type="text" name="title"></input><button type="submit">submit</button></form>  '
  )
}

function adminPost(req, res) {
  const product = new Product(req.body.title)
  product.save()
  console.log("Uložil jsem svůj product", product)
  res.redirect("/shop")
}

function shopGet(req, res) {
  Product.fetchAll((products) => {
    //the page is loaded only once all the products are fetched
    res.send(`<p>Here is the list of our products: </p> 
    ${products.map((product) => `<li>${product.title}</li>`)}
    <button onclick="window.location.href='/admin'">Go to back to admin</button>
    `)
  })
}

function fourOhFour(req, res) {
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
