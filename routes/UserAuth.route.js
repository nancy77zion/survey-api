const express = require("express");
const { login, register, logout } = require("../controllers/UserAuth.controller");
const routerManager = express.Router();

routerManager.post('/login', login)
routerManager.post('/register', register)
routerManager.post('/logout', logout)

module.exports = routerManager