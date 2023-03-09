'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var clienteSchema=Schema({
    nombre: String,
    correo:String
})
module.exports=mongoose.model('Cliente',clienteSchema);