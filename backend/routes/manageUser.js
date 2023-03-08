const express=require('express');
const Router = express.Router();
const manageuserService = require('../Services/manageuser')

Router.post('/api',manageuserService.api)
Router.get('/person',manageuserService.person)
Router.put('/updateuser/:ID',manageuserService.updateuser)
Router.delete('/delete/:p_id',manageuserService.deleteuser)
Router.post('/create',manageuserService.createuser)
Router.put('/updatestatusperson/:id',manageuserService.updateuserperson)

module.exports=Router

