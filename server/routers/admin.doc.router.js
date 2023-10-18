const express = require("express");
const {
    getAll
} = require("../controllers/admin.controller");
const AdminDocRouter = express.Router();
// const authProtection = require("../midlwares/authmidalwre.js");

AdminDocRouter.get("/all", getAll);
// AdminDocRouter.get("/:id", getOne);
// AdminDocRouter.post("/add", create);
// AdminDocRouter.delete("/:id", remove);
// AdminDocRouter.put("/:id", update);


module.exports =  AdminDocRouter
