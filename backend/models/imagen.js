'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var imagenSchema=Schema({
    codigo:Number,
    nombre:String,
    foto:String,
    tipo:String
})
module.exports=mongoose.model('Imagen',imagenSchema);