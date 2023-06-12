const Product = require("./product")

function defaultPage(req, res) {
  //default page
  res.send(`
    <div>
      <h2>Node.js project for learning purposes</h2>
      ${Product.Nav}
    </div>
    `)
}

module.exports = { defaultPage }
