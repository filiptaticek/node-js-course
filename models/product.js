//we will define our data types in here later on

const products = []

module.exports = class Product {
  constructor(t) {
    this.title = t
  }

  save() {
    products.push(this)
  }

  static fetchAll() {
    return products
  }
}
