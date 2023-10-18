const express = require("express");
const { getAll ,signin, signup } = require("../controllers/admin.controller");
const AdminDocRouter = express.Router();

AdminDocRouter.get("/all", getAll);
AdminDocRouter.post('/signup', signup);

// Sign-in route
AdminDocRouter.post('/signin', signin);
// AdminDocRouter.get("/:id", getOne);
// AdminDocRouter.post("/add", create);
// AdminDocRouter.delete("/:id", remove);
// AdminDocRouter.put("/:id", update);

module.exports = AdminDocRouter;
