const express = require('express');
const Router = express.Router();
const dataevaluation = require('../Services/dataevaluation');

Router.get('/showobjective/:id',dataevaluation.showobjective)
Router.put('/updateobjective/:id',dataevaluation.updateobjective)
Router.post('/addprojectevaluation',dataevaluation.addprojectevaluation)
Router.get('/estimateproject/:id',dataevaluation.estimateproject)

module.exports = Router