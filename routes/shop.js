const express = require("express")
const router = express.Router()
const adminData = require("./admin")

router.get("/", (req, res, next) => {
  //In fact, the products array is not blanked once we refresh the page, as it is connected with the server itself.
  res.send(`<p>Here is the list of our products: </p> ${adminData.products}`)
})

module.exports = router
