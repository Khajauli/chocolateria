'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var administradorSchema=Schema({
    cedula: String,
    nombre: String,
    usuario:String,
    contrasenia:String,
    rol:String
})
module.exports=mongoose.model('Administrador',administradorSchema);