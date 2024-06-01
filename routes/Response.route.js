const express = require('express');
const routerManager = express.Router();

const { createResponse, getResponse, updateResponse, deleteResponse } = require('../controllers/Response.controller')


routerManager.post('/', createResponse);
routerManager.get('/:id',getResponse);
routerManager.put('/:id', updateResponse);
routerManager.delete('/:id', deleteResponse);


module.exports = routerManager;