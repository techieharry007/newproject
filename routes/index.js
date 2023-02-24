const express = require('express')
const app = express()
const router = express.Router()
const controller = require("../controller/apiController")
router.post("/",controller.getData)
router.get("/getUserData",controller.getUserData)
router.post("/profile",controller.getProfile)
router.post("/getprofile",controller.getProfileValue)
module.exports = router