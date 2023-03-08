const express=require('express');
const Router = express.Router();
const datareport = require('../Services/datareport');

Router.get('/quarterchargesone/:id',datareport.quarterchargesone)
Router.get('/indicreportone/:id',datareport.indicreportone)
Router.get('/detailreportone/:id',datareport.detailreportone)
Router.get('/problemreportone/:id',datareport.problemreportone)
Router.get('/quarterchargestwo/:id',datareport.quarterchargestwo)
Router.get('/indicreporttwo/:id',datareport.indicreporttwo)
Router.get('/detailreporttwo/:id',datareport.detailreporttwo)
Router.get('/problemreporttwo/:id',datareport.problemreporttwo)
Router.get('/quarterchargesthree/:id',datareport.quarterchargesthree)
Router.get('/indicreportthree/:id',datareport.indicreportthree)
Router.get('/detailreportthree/:id',datareport.detailreportthree)
Router.get('/problemreportthree/:id',datareport.problemreportthree)
Router.get('/quarterchargesfour/:id',datareport.quarterchargesfour)
Router.get('/indicreportfour/:id',datareport.indicreportfour)
Router.get('/detailreportfour/:id',datareport.detailreportfour)
Router.get('/problemreportfour/:id',datareport.problemreportfour)

module.exports = Router