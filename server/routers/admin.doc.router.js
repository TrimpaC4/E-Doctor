const express = require("express");
const AdminDocRouter = express.Router();

const { getAll,updatee} = require("../controllers/admin.controller");
// const authProtection = require("../midlwares/authmidalwre.js");

AdminDocRouter.get("/all", getAll);
// AdminDocRouter.get("/:id", getOne);
// AdminDocRouter.post("/add", create);
// AdminDocRouter.delete("/:id", remove);
AdminDocRouter.put("/:id", updatee);


module.exports =  AdminDocRouter
