const express=require('express');
const Router=express.Router();
const userService=require('../Services/userService');

Router.post('/apilogin',userService.apiLogin);
Router.post('/auth',userService.apiLogin2)
module.exports=Router