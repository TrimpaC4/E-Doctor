const express = require("express");
const { getAll ,signin, signup } = require("../controllers/admin.controller");
const AdminDocRouter = express.Router();

AdminDocRouter.get("/all", getAll);
AdminDocRouter.post('/signup', signup);
AdminDocRouter.post('/signin', signin);

module.exports = AdminDocRouter;
