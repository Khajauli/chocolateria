'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var clienteSchema=Schema({
    cedula: String,
    nombre: String,
    notifi: Boolean,
    usuario:String,
    contrasenia:String,
    correo:String
})
module.exports=mongoose.model('Cliente',clienteSchema);