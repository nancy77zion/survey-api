const express = require('express');
const routerManager = express.Router();

const { createAnswer, getAnswer, updateAnswer, deleteAnswer } = require('../controllers/Answer.controller')


routerManager.post('/', createAnswer);
routerManager.get('/:id', getAnswer);
routerManager.put('/:id', updateAnswer);
routerManager.delete('/:id', deleteAnswer);


module.exports = routerManager;