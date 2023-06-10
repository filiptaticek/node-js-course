// All the controllers in our project are defined in this file

const Product = require("../models/product")

/*_______________________________________________________________________________________*/

function adminGet(req, res) {
  //form for sending post request
  res.send(
    `
    <p>This page offers form for sending request and also is an handler for the request itself</p>
    <form method="POST" action="/admin"><input type="text" name="title"></input><button type="submit">submit</button></form>
    `
  )
}

function adminPost(req, res) {
  //accepting the post request and sending the data do the database
  const title = req.body.title
  const description = "Description"
  const price = 9.99
  const product = new Product(title, price, description)
  product
    .save()
    .then(() => {
      res.redirect("/product")
    })
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function productGet(req, res) {
  //fetching all the products from the database
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.send(`
      <div><h2>Products</h2>
        <ul>
          ${rows
            .map(
              (product) =>
                `<li><a href="product/${product.id}">${product.title}</a></li>`
            )
            .join("")}
        </ul>
      </div>
      `)
    })
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function productDetailGet(req, res) {
  //page displaying a single product
  const productId = req.params.productId
  Product.findById(productId)
    .then(([product]) => {
      res.send(
        `<p>This is the single product with a title: ${product[0].title}`
      )
    })
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function defaultPage(req, res) {
  //default page
  res.send(`
  <div>
    <h2>Node js project for learning purposes</h2>
    <button onclick="window.location.href='/admin'">Create a new product</button>
    <button onclick="window.location.href='/product'">List of products</button>
  </div>
  `)
}

/*_______________________________________________________________________________________*/

module.exports = {
  adminGet,
  adminPost,
  productGet,
  productDetailGet,
  defaultPage,
}
