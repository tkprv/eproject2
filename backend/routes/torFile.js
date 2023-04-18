const express=require('express');
const Router = express.Router();
const torfile = require('../Services/torfile')

Router.post('/torupload',torfile.torfile)
Router.get('/getpdf/:id',torfile.getpdf)
Router.get('/openpdf/:id',torfile.openpdf)
Router.post('/evaluationfile',torfile.evaluationfile)
Router.get('/getevaluationfile/:id',torfile.getevaluationfile)

module.exports = Router