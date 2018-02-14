'use strict'
const express = require('express')
const http = require('http')
const bodyParser=require('body-parser')
const Firebase = require('firebase')
const nodemailer = require('nodemailer')

var smtpTransport=nodemailer.createTransport('SMTP',{
    service:'Gmail',
    auth:{
        user:'grupo6facci@gmail.com',
        pass:'abcde12345..'
    }
});

// var mailOptions={
//     from:'Grupo 6',
//     to:'jairo.romanaa@gmail.com',
//     subject:'Bienvenido',
//     tex:'Hola'
// }

let items=[]
let contador=0

let miRutaUsuarios = new Firebase('https://facci-project.firebaseio.com/mensajes')
let routerUsuarios=express.Router()
routerUsuarios.use(bodyParser())
routerUsuarios.route('/')

.get(function(request,response){
    items=[]
    miRutaUsuarios.once("value",function(snap){
        let nuevoUsuario=snap.val()
        items.push(nuevoUsuario)
        console.log(contador++)
        return response.send(items)
    })
})
.post(function(req,res,next){
    miRutaUsuarios.child(req.body.id).set(req.body)
    var mail = req.body.correo
    var mailOptions = {
        from: 'Grupo 6',
        to: mail,
        subject: 'Bienvenido',
        text: 'Gracias por enviarnos tu comentario, te responderemos lo mas breve posible.'
    }
    smtpTransport.sendMail(mailOptions,function (error,respuesta) {
        if (error) {
            console.log(error);
        }else{
            console.log('Mensaje enviado');
        }
    })
    res.status(200).send('ingreso correcto')
})
.put(function(req,res,next){
    miRutaUsuarios(req.body.id).set(req.body)
     res.status(200).send(req.body.codigo)
})
.delete(function(req,res,next){
    miRutaUsuarios.remove(function(error){
        if (error)
         {  
             return res.status(404).send('error de todas')
         }
     })
    return res.status(200).send('ok')
});

module.exports = routerUsuarios;