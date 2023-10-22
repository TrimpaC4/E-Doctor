const express = require("express");
const {
  getAll,
  getOne,
  deleteOne,
  updateOne,
  login,
  register,
  getAvailableDoctors,
  updateTimes,
  getByDepartment,
  verifyDoctor,
  getAllFiltred,
  updateLatLong,
  updateisLocated
} = require("../controllers/doctor.controllers");
const doctorRouter = express.Router();
const authProtection = require("../midlwares/authmidalwre.js");

doctorRouter.post("/login", login);
doctorRouter.get("/getAll", getAll);
doctorRouter.post("/register", register);
doctorRouter.get("/getOne", authProtection, getOne);
doctorRouter.delete("/:id", deleteOne);
doctorRouter.put("/:id", updateOne);
doctorRouter.post("/getAvailable", getAvailableDoctors);
doctorRouter.put("/schedule/up", updateTimes);
doctorRouter.put("/verify/:id", verifyDoctor);
doctorRouter.post("/departmentFilter", getByDepartment);
doctorRouter.get("/departFiltred/:depart",getAllFiltred)
doctorRouter.put("/updateGeo",updateLatLong)
doctorRouter.put("/updateLocation",updateisLocated)


module.exports = doctorRouter;
