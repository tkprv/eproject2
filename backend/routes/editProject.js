const express = require('express');
const Router = express.Router();
const editproject = require('../Services/editproject')

Router.get("/strategicid",editproject.strategicid)
Router.get("/strategic",editproject.strategic)
Router.get('/sectionpro',editproject.sectionpro)
Router.get('/showuserpro/:id',editproject.showuserpro)
Router.get('/userpro',editproject.userpro)
Router.put('/updateuserproject/:id',editproject.updateuserproject)
Router.get('/integrationpro',editproject.integrationpro)
Router.get('/showobjective/:id',editproject.showobjective)
Router.put('/updateobjective/:id',editproject.updateobjective)
Router.get('/showindicpro/:id',editproject.showindicpro)
Router.put('/updateindicpro/:id',editproject.updateindicpro)
Router.get('/showstep/:id',editproject.showstep)
Router.put('/updatestep/:id',editproject.updatestep)
Router.get('/workplanpro',editproject.workplanpro)
Router.get('/showchargeshead/:id',editproject.showchargeshead)
Router.put('/updatechargeshead/:id',editproject.updatechargeshead)
Router.get('/showbenefit/:id',editproject.showbenefit)
Router.put('/updatebenefit/:id',editproject.updatebenefit)
Router.put('/updateproject/:id',editproject.updateproject)

module.exports = Router