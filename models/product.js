//all the data objects are defined in this file

const fs = require("fs")
const path = require("path")

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data", //finding the seeked file
  "products.json"
)

function getProductsFile(cb) {
  //we use the callback function to return the content only once the data is fetched
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(t) {
    this.title = t
  }

  save() {
    this.id = Math.random().toString()
    getProductsFile((products) => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    getProductsFile(cb)
  }

  static fetchOne(id, cb) {
    getProductsFile((products) => {
      const product = products.find((product) => (product.id = id))
      cb(product)
    })
  }
}
