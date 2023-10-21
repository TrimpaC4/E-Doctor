const express = require("express")
const { makeRoom, getAllRoomsForPatient, getAllRoomsForDoctor ,getByRoomId , del} = require("../controllers/room.controller")
const route = express.Router()

route.post("/makeRoom", makeRoom)
route.get("/getAllPat/:patId", getAllRoomsForPatient)
route.get("/getAllDoc/:docId", getAllRoomsForDoctor)
route.get("/OneRoom/:id", getByRoomId)
route.delete("/delete" , del)

module.exports = route
