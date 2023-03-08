const express=require('express');
const Router = express.Router();
const editsg = require('../Services/ediStg')

Router.get('/goal',editsg.goal)
Router.get('/tactic',editsg.tactic)
Router.post('/creategoal',editsg.creategoal)
Router.post('/createindicgoal',editsg.createindicgoal)
Router.post('/createtactic',editsg.createtactic)
Router.get('/goaal:id',editsg.goaal)
Router.get('/indic',editsg.indic)
Router.get('/showgoal/:id',editsg.showgoal)
Router.put('/updategoal/:id',editsg.updategoal)
Router.get('/showindic/:id',editsg.showindic)
Router.put('/updateindic/:id',editsg.updateindic)
Router.put('/showtactic/:id',editsg.showtactic)
Router.put('/updatetactic/:id',editsg.updatetactic)
Router.get('/tactic2:id',editsg.tactic2)


   

  

module.exports=Router
