const express = require('express');
const Router = express.Router();
const dataevaluation = require('../Services/dataevaluation');

Router.get('/showobjective/:id',dataevaluation.showobjective)
Router.put('/updateobjective/:id',dataevaluation.updateobjective)
Router.post('/addprojectevaluation',dataevaluation.addprojectevaluation)
Router.get('/estimateproject/:id',dataevaluation.estimateproject)
Router.put('/updatestatus/:id',dataevaluation.updatestatus)
Router.put('/editprojectevaluation/:id',dataevaluation.editprojectevaluation)

module.exports = Router