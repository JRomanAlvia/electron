'use strict'
const express = require('express')
const http = require('http')
const bodyParser=require('body-parser')
const nodemailer=require('nodemailer')
const Firebase = require('firebase')
let items=[]
let items2=[]
let contador=0

let miRuta= new Firebase('https://facci-project.firebaseio.com/foro')
let rutaForo=express.Router()
rutaForo.use(bodyParser())
rutaForo.route('/')
.get(function(request,response){
    items=[]
    miRuta.once("value",function(snap){
        let nuevoUsuario=snap.val()
        items.push(nuevoUsuario)
        console.log(contador++)
        return response.send(items)
    })
})
.post(function(req,res,next){
    miRuta.child(req.body.id).set(req.body)    
    res.status(200).send('post version 1')
})
.put(function(req,res,next){
    miRuta.child(req.body.time).set(req.body)
    res.status(200).send(req.body.time)
})
.delete(function(req,res,next){
    miRuta.child(req.body.time).remove(function(error){
        if (error)
         {
             return res.status(404).send('error de todas')
         }
     })
    res.status(200).send('ok')
});

module.exports = rutaRequerimiento;