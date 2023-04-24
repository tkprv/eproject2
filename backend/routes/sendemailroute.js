const express=require('express');
const Router = express.Router();
const SendEmail = require('../Services/sendEmail')

Router.get('/email/:id/:name/:status',SendEmail.email)
Router.get('/emailtodairec/:id/:name',SendEmail.emailDairector)
Router.get('/emailtouserproject/:id/:name/:status',SendEmail.emailtouserproject)

module.exports=Router