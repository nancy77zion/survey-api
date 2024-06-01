const express = require('express');
const { createQuestion, getQuestion, updateQuestion, deleteQuestion } = require('../controllers/Question.controller');
const routerManager = express.Router();


routerManager.post('/', createQuestion);
routerManager.get('/:id', getQuestion);
routerManager.put('/:id', updateQuestion);
routerManager.delete('/:id', deleteQuestion);


module.exports = routerManager;