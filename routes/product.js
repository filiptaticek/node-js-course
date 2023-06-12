const express = require("express")
const router = express.Router()
const controllers = require("../controllers/index")

router.get("/", controllers.productAll)

router.post("/", controllers.productPost)

router.get("/:productId", controllers.productDetail)

router.post("/delete", controllers.productDelete)

router.post("/:productId", controllers.productEdit)

module.exports = router
