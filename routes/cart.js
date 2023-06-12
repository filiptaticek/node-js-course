const express = require("express")
const router = express.Router()
const controllers = require("../controllers/cart")

router.get("/", controllers.cartGet)
router.post("/", controllers.CartPost)

module.exports = router
