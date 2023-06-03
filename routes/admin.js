const express = require("express")
const router = express.Router()

const products = []

router.get("/", (req, res, next) => {
  // 1) we can make difference between app.get and app.post, app.use is for any request
  // 2) the more specific middleware has to be first, otherwise it will never be reached
  res.send(
    '<form method="POST" action="admin"><input type="text" name="title"></input><button type="submit">submit</button></form>  '
  )
})

router.post("/", (req, res, next) => {
  console.log("Redirected man")
  products.push(req.body.title)
  res.redirect("/shop")
})

module.exports = {
  router,
  products,
}
