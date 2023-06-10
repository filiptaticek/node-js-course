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
  Product.create({
    title,
    description,
    price,
  })
    .then((result) => {
      console.log("Added a new book succesfuly.")
      res.redirect("/")
    })
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function productGet(req, res) {
  //fetching all the products from the database
  Product.findAll()
    .then((products) => {
      const productHTML = products
        .map(
          (product) =>
            `<a href="/product/${product.id}">Title: ${product.title}</p>`
        )
        .join("")
      res.send(productHTML)
    })
    .catch((err) => console.log("Some err", err))
}

/*_______________________________________________________________________________________*/

function productDetailGet(req, res) {
  //page displaying a single product
  //const prodId = req.body.productId
  Product.findByPk(1)
    .then((result) =>
      res.send(`<p>This is the title of your book: ${result.title}!`)
    )
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
