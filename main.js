'use strict'
const express = require('express')
const http = require('http')
const bodyParser=require('body-parser')
const nodemailer =require('nodemailer')
const electron = require('electron')


const {app}= electron
const {BrowserWindow}=electron


const routerUser = require('./routes/routeUser')
const routerForo = require('./routes/routeForo')

let router=express.Router()
router.use(bodyParser())
router.route('/')

var port = Number(process.env.PORT || 3000);
let appExpress= express()
.use('/datos/mensajes',routerUser)
.use('/datos/foro',routerForo)
.use(express.static(__dirname+'/public'))
.listen(port)


let win

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL('http://127.0.0.1:' + port + '/index.html')
    // win.webContents.openDevTools()
    win.on('closed', () => {
        win = null
    })
    win.maximize();
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'win32') {
        app.quit();
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
