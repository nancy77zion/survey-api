const express = require('express');
const { createSurvey, getSurvey, updateSurvey, deleteSurvey } = require('../controllers/Survey.controller');
const routerManager = express.Router();


routerManager.post('/', createSurvey);
routerManager.get('/:id',getSurvey);
routerManager.put('/:id', updateSurvey);
routerManager.delete('/:id',deleteSurvey);

module.exports = routerManager
