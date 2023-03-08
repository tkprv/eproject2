const express = require('express');
const Router = express.Router();
const addreport = require('../Services/addreport');

Router.post('/createquartercharges',addreport.createquartercharges)
Router.put('/updatereportone/:id',addreport.updatereportone)
Router.get('/showreport/:id',addreport.showreport)
Router.post('/createdetail',addreport.createdetail)
Router.post('/createproblem',addreport.createproblem)
Router.get('/showresult/:id',addreport.showresult)
Router.put('/createresult/:id',addreport.createresult)
Router.put('/updatereporttwo/:id',addreport.updatereporttwo)
Router.put('/updatereportthree/:id',addreport.updatereportthree)
Router.put('/updatereportfour/:id',addreport.updatereportfour)

module.exports = Router