const express = require('express');
const routerManager = express.Router();

const {createOption, getOption, updateOption, deleteOption} = require('../controllers/Option.controller')


routerManager.post('/', createOption);
routerManager.get('/:id', getOption);
routerManager.put('/:id', updateOption);
routerManager.delete('/:id', deleteOption);


module.exports = routerManager;