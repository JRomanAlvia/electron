'use strict'
const express = require('express')
const http = require('http')
const bodyParser=require('body-parser')
const Firebase = require('firebase')
let items=[]
let contador=0

let miRutaUsuarios = new Firebase('https://facci-project.firebaseio.com/foro')
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