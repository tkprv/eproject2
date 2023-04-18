const express=require('express');
const Router = express.Router();
const datakeepproject = require('../Services/datakeepproject');

Router.get('/project/:id',datakeepproject.project)
Router.put('/updateuserproject/:id',datakeepproject.updateuserproject)
Router.put('/updatestrategicplan/:id',datakeepproject.updatestrategicplan)
Router.put('/updatestrategic/:id',datakeepproject.updatestrategic)
Router.put('/updategoal/:id',datakeepproject.updategoal)
Router.put('/updatetactic/:id',datakeepproject.updatetactic)
Router.put('/updateobjective/:id',datakeepproject.updateobjective)
Router.put('/updateindicpro/:id',datakeepproject.updateindicpro)
Router.put('/updatestep/:id',datakeepproject.updatestep)
Router.put('/updatecharges/:id',datakeepproject.updatecharges)
Router.put('/updatebenefit/:id',datakeepproject.updatebenefit)

module.exports = Router