-'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var chocolateSchema=Schema({
    codigo:Number,
    nombre:String,
    descripcion:String,
    imagen:String,
    estado:String,
    precio:Number,
    puntuacion:Number,
    totales:Number,
    categoria:String
})
module.exports=mongoose.model('Chocolate',chocolateSchema);