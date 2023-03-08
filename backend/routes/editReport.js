const express = require('express');
const Router = express.Router();
const editreport = require('../Services/editreport')

Router.get('/showeditreport/:id',editreport.showeditreport)
Router.put('/updatequartercharges/:id',editreport.updatequartercharges)
Router.get('/showdetail/:id',editreport.showdetail)
Router.put('/updatedetail/:id',editreport.updatedetail)
Router.get('/showproblem/:id',editreport.showproblem)
Router.put('/updateproblem/:id',editreport.updateproblem)

module.exports = Router