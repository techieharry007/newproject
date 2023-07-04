const express = require('express')
const app = express()
const router = express.Router()
const controller = require("../controller/apiController")
// router.post("/",controller.getData)
// router.get("/getUserData",controller.getUserData)
router.get("/democall",controller.demoCall)
router.post("/getprofile",controller.getProfileValue)
router.post("/create-user/",controller.createNewUser)
router.post("/create-entry/",controller.getNewEnry)

module.exports = router