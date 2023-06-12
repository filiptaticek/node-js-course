// All the controllers in our project are defined in this file

const Product = require("../models/product")
const CartItem = require("../models/cartItem")
const Nav = `
<button onclick="window.location.href='/'">Home page</button>
<button onclick="window.location.href='/product'">Products page</button>
<button onclick="window.location.href='/cart'">Carts page</button>
`

/*_______________________________________________________________________________________*/

function productPost(req, res) {
  //accepting the post request and sending the data do the database
  const title = req.body.title
  const description = "Description"
  const price = 9.99
  req.user
    .createProduct({
      //we can create a product already on our associated user
      title,
      description,
      price,
    })
    .then(() => {
      res.redirect("/product")
    })
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function productAll(req, res) {
  //fetching all the products from the database
  req.user
    .getProducts()
    .then((products) => {
      const productHTML = `
        ${products
          .map(
            (product) =>
              `<a href="/product/${product.id}">- ${product.title}</p>`
          )
          .join("")}
      `
      res.send(`<div>        
      <h3>Add new product</h3>
      <form method="POST" action="/product"><input autofocus type="text" name="title"></input><button type="submit">submit</button></form>
      <h3>Navigation</h3>
      ${Nav}
      <h3>All products:</h3>
      ${productHTML}
      `)
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
        <h3>Title</h3>
        <p>${result.title}</p>
        <h3>Edit book title: </h3>
        <form method="POST" action="/product/${productId}"><input autofocus type="text" name="title"></input><button type="submit">submit</button></form>

        <h3>Actions: </h3>
        <form method="POST" action="/product/delete">
          <input type="hidden" name="id" value=${productId}></input>
          <button type="submit">Delete post</button>
        </form>

        <form method="POST" action="/cart">
          <input type="hidden" name="id" value=${productId}></input>
          <button type="submit">Add to cart</button>
        </form>

        <h3>Navigation: </h3>
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
  Product.destroy({ where: { id: productId } })
    .then(() => {
      res.redirect(`/product`)
    })
    .catch((err) => console.log("Chyba", err))
}

/*_______________________________________________________________________________________*/

function cartGet(req, res) {
  //cart page
  CartItem.findAll()
    .then((results) => {
      const productHTML = `
      ${results
        .map(
          (result) =>
            `<a href="/product/${result.productId}">Product with ID ${result.productId} is in the cart ${result.quantity} times</p>`
        )
        .join("")}
          `
      res.send(`
      <h3>This is you cart: </h3>
          ${productHTML}
      `)
    })
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function CartPost(req, res, next) {
  //adding things to database with this request
  const prodId = req.body.id
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then((products) => {
      let product
      if (products.length > 0) {
        product = products[0]
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1
        return product
      }
      return Product.findByPk(prodId)
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      })
    })
    .then(() => {
      res.redirect("/cart")
    })
    .catch((err) => console.log(err))
}

/*_______________________________________________________________________________________*/

function defaultPage(req, res) {
  //default page
  res.send(`
  <div>
    <h2>Node.js project for learning purposes</h2>
    ${Nav}
  </div>
  `)
}

/*_______________________________________________________________________________________*/

module.exports = {
  productPost,
  productAll,
  productDetail,
  productEdit,
  productDelete,
  defaultPage,
  CartPost,
  cartGet,
}
