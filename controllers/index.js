// All the controllers in our project are defined in this file

const Product = require("../models/product")
const Nav = `
<button onclick="window.location.href='/admin'">Create a new product</button>
<button onclick="window.location.href='/product'">List of products</button>
`

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

function productAll(req, res) {
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

function productDetail(req, res) {
  //page displaying a single product
  //we could also use syntax like Product.findAll({where: {id: req.body.productId}})...
  const productId = req.params.productId
  Product.findByPk(productId)
    .then((result) =>
      res.send(
        `<div>
        <p>Book title: ${result.title}!</p>
        <p>Edit book title: </p>
        <form method="POST" action="/product/${productId}"><input type="text" name="title"></input><button type="submit">submit</button></form>
        <form method="POST" action="/product/delete">
          <input type="hidden" name="id" value=${productId}></input>
          <button type="submit">
          Delete post
          </button>
        </form>
        ${Nav}
      </div>
      `
      )
    )
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function productEdit(req, res) {
  const productId = req.params.productId
  const newTitle = req.body.title
  Product.findByPk(productId)
    .then((product) => {
      product.title = newTitle
      return product.save()
    })
    .then(() => res.redirect(`/product/${productId}`))
    .catch((err) => console.log("We've got an issue", err))
}

/*_______________________________________________________________________________________*/

function productDelete(req, res) {
  const productId = req.body.id
  console.log("Došlo to sem aspoň", productId)
  Product.destroy({ where: { id: productId } })
    .then(() => {
      res.redirect(`/product`)
    })
    .catch((err) => console.log("Chyba", err))
}

/*_______________________________________________________________________________________*/

function defaultPage(req, res) {
  //default page
  res.send(`
  <div>
    <h2>Node js project for learning purposes</h2>
    ${Nav}
  </div>
  `)
}

/*_______________________________________________________________________________________*/

module.exports = {
  adminGet,
  adminPost,
  productAll,
  productDetail,
  productEdit,
  productDelete,
  defaultPage,
}
