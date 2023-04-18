const express=require('express');
const Router = express.Router();
const supplies = require('../Services/supplies');

Router.get('/statuspurchase/:id',supplies.statuspurchase)
Router.post('/addstatuspurchase',supplies.addstatuspurchase)
Router.put('/updatestatuspurchase/:id',supplies.updatestatuspurchase)
Router.put('/updatestatus/:id',supplies.updatestatus)

module.exports = Router