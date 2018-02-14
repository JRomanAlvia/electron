'use strict'
const express = require('express')
const http = require('http')
const bodyParser=require('body-parser')
const nodemailer =require('nodemailer')

const routerUser = require('./routes/routeUser')
const routerForo = require('./routes/routeForo')

let router=express.Router()
router.use(bodyParser())
router.route('/')

var port = Number(process.env.PORT || 3000);
let app= express()
.use('/datos/mensajes',routerUser)
.use('/datos/foro',routerForo)
.use(express.static(__dirname+'/public'))
.listen(port)
