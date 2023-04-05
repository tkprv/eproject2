const express=require('express');
const Router = express.Router();
const managepland = require('../Services/planoffice')

Router.get('/strategic',managepland.getstrategic)
Router.post('/createstrategic',managepland.createstrategic)
Router.put('/updatesstatus/:ID',managepland.updatesstatus)
Router.put('/updatestrategic/:f_id',managepland.updatestrategic)
Router.delete('/deletestrategic/:f_id',managepland.deletestrategic)
Router.get('/strategicid',managepland.getstrategicid)
Router.delete('/deletestid/:ID',managepland.deletestid)
Router.put('/updatest/:ID',managepland.updatest)
Router.post('/createstid',managepland.createstid)
Router.post('/datast/:id',managepland.datast)
Router.get('/getyear',managepland.getyears)

module.exports=Router