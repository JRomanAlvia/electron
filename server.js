'use strict'
const express = require('express')
const http = require('http')
const bodyParser=require('body-parser')
const nodemailer =require('nodemailer')

const routerUser = require('./routes/routeUser')

let router=express.Router()
router.use(bodyParser())
router.route('/')

var EmailCtrl = require('./controller/mailController');
//email route
router.post('/email', EmailCtrl.sendEmail);

var port = Number(process.env.PORT || 3000);
let app= express()
.use('/usuarios/datos',routerUser)
.use(express.static(__dirname+'/public'))
.listen(port)
