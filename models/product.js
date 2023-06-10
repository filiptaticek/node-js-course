//all the data objects are defined in this file
const db = require("../util/database")

module.exports = class Product {
  constructor(title, price, description) {
    this.title = title
    this.price = price
    this.description = description
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, description) VALUES(?, ?, ?) ",
      [this.title, this.price, this.description]
    )
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products")
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id])
  }
}
