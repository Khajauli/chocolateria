'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var clienteSchema=Schema({
    cedula: Number,
    nombre: String,
    notifi: Boolean,
    usuario:String,
    contrasenia:String
})
module.exports=mongoose.model('Cliente',clienteSchema);