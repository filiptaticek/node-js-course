const express = require("express")
const router = express.Router()
const controllers = require("../controllers/index")

router.get("/", controllers.productGet)

router.get("/:productId", controllers.productDetailGet)

module.exports = router
