const express=require('express');
const Router = express.Router();
const manageService=require('../Services/managesys');

Router.get('/agency',manageService.agency);
Router.post('/createagency',manageService.agencycreate)
Router.delete('/delete2/:a_id',manageService.agencydelete)
Router.put('/updateagency/:section_id',manageService.agencyupdate)

module.exports=Router