const express = require('express');
const Router = express.Router();
const editkeepreport = require('../Services/editkeepreport');

Router.put('/updatequartercharges/:id',editkeepreport.updatequartercharges)
Router.put('/updatereportone/:id',editkeepreport.updatereportone)
Router.put('/updatedetail/:id',editkeepreport.updatedetail)
Router.put('/updateproblem/:id',editkeepreport.updateproblem)
Router.put('/updatereporttwo/:id',editkeepreport.updatereporttwo)
Router.put('/updatereportthree/:id',editkeepreport.updatereportthree)
Router.put('/updatereportfour/:id',editkeepreport.updatereportfour)

module.exports = Router