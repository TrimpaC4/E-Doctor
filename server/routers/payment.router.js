const express = require("express")
const Router = express.Router()
const {Add, verifyPayment} = require("../controllers/payment.controller")

Router.post("/add", Add)
Router.post("/:id", verifyPayment)

module.exports = Router