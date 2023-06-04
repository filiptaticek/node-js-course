//we will define our data types in here later on

const fs = require("fs")
const path = require("path")
const products = []

module.exports = class Product {
  constructor(t) {
    this.title = t
  }

  save() {
    console.log("Da bin ich noch")
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data", //finding the seeked file
      "products.json"
    )
    fs.readFile(p, (err, fileContent) => {
      //reading the current content of the file
      let products = []
      if (!err) {
        products = JSON.parse(fileContent) //if there's no error we parse the content of the file
      }
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    //we use the callback function to return the content only once the data is fetched
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data", //finding the seeked file
      "products.json"
    )
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([])
      }
      cb(JSON.parse(fileContent))
    })
  }
}
