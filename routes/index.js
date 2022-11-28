const express = require('express')
const app = express()
const router = express.Router()
const controller = require("../controller/apiController")
router.get("/",controller.getData)
router.get("/getUserData",controller.getUserData)
module.exports = router