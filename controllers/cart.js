const CartItem = require("../models/cartItem")

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

module.exports = {
  CartPost,
  cartGet,
}
