const express=require('express');
const Router=express.Router();
const reportst =require('../Services/reportprojectSt')

Router.get('/reportst',reportst.getreportst)
Router.get('/fiyear',reportst.getfiscalyear)
Router.get('/section',reportst.getsection)
Router.get('/getstatus',reportst.getstatus) 
Router.get('/getreportquarter',reportst.getreportquarter) 
Router.post('/getreportplanyear',reportst.getreportplanyear)  
Router.post('/getreportplanQ',reportst.getreportplanQ)
Router.post('/getreportproject',reportst.getreportproject)
Router.post('/getuserproject',reportst.getuserproject)
Router.post('/getobjectproject',reportst.getobjectproject) 
Router.post('/getindicproject',reportst.getindicproject)
Router.post('/getstepproject',reportst.getstepproject)
Router.post('/getbenefit',reportst.getbenefit)
Router.post('/getplanproject',reportst.getplanproject)  
Router.post('/getbuggest',reportst.getbuggest)
Router.get('/doc',reportst.word)


module.exports=Router