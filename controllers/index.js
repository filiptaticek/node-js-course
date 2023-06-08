// All the controllers in our project are defined in this file

const Product = require("../models/product")

/*_______________________________________________________________________________________*/

function adminGet(req, res) {
  /* We can make difference between app.get and app.post, app.use is for any request.
   The more specific middleware has to be first, otherwise it will never be reached */
  res.send(
    `
    <p>This page offers form for sending request and also is an handler for the request itself</p>
    <form method="POST" action="/admin"><input type="text" name="title"></input><button type="submit">submit</button></form>
    `
  )
}

function adminPost(req, res) {
  const product = new Product(req.body.title)
  product.save()
  res.redirect("/product")
}

/*_______________________________________________________________________________________*/

function productGet(req, res) {
  Product.fetchAll((products) => {
    //the page is loaded only once all the products are fetched
    res.send(`<p>Products list
    ${products.map(
      (product) =>
        `<br/>- <a href='product/${product.id}'>${product.title}</a><br/>`
    )}
    <br/>
    <button onclick="window.location.href='/'">
    Back to home page</button>
    `)
  })
}

/*_______________________________________________________________________________________*/

function defaultPage(req, res) {
  //catching all the uncatched
  res.send(`
  <div>
    <h2>Node js project for learning purposes</h2>
    <button onclick="window.location.href='/admin'">Create a new product</button>
    <button onclick="window.location.href='/product'">List of products</button>
  </div>
  `)
}

/*_______________________________________________________________________________________*/

function productDetailGet(req, res) {
  const productId = req.params.productId
  Product.fetchOne(productId, (product) => {
    res.send(`<div>Page for a simple product by their ID from the URL: ${productId}<br/><br/>
    Title: ${product.title}</div>`)
  })
}

/*_______________________________________________________________________________________*/

module.exports = {
  adminGet,
  adminPost,
  productGet,
  defaultPage,
  productDetailGet,
}
