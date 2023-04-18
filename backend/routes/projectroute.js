const express=require('express');
const Router = express.Router();
const manageproject = require('../Services/project')

Router.get('/workplan',manageproject.workplan)
Router.get('/integration',manageproject.integration)
Router.post('/section',manageproject.getSection)
Router.post('/createnewproject',manageproject.newproject22222)
// Router.get('/createnewproject',manageproject.workplan222)
Router.post('/newprojectindic',manageproject.newprojectindic)
Router.post('/newprojectstepe',manageproject.newprojectstepe)
Router.post('/newobjective',manageproject.newobjective)
Router.post('/userproject',manageproject.userproject)
Router.post('/strategicproject',manageproject.strategicproject)
Router.post('/charges',manageproject.chargesproject)
Router.post('/sakes',manageproject.createbenefit)
Router.post('/send_email',manageproject.send_email)
Router.post('/email',manageproject.email)



module.exports=Router