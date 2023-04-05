const express = require('express');
const Router = express.Router();
const editmanager = require('../Services/editmanager')

Router.get('/showstrategicplan/:id',editmanager.showstrategicplan)
Router.get('/strategicplanpro',editmanager.strategicplanpro)
Router.put('/updatestrategicplan/:id',editmanager.updatestrategicplan)
Router.get('/strategicpro',editmanager.strategicpro)
Router.put('/updatestrategic/:id',editmanager.updatestrategic)
Router.get('/goalpro',editmanager.goalpro)
Router.put('/updategoal/:id',editmanager.updategoal)
Router.get('/tacticpro',editmanager.tacticpro)
Router.put('/updatetactic/:id',editmanager.updatetactic)

module.exports = Router