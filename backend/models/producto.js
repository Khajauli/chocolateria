'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var productoSchema=Schema({
    código:String,
    nombre:String,
    descripcion:String,
    imagen:String,
    precio:Number,
    puntuacion:Number,
    totales:Number,
    categoria:String
})
module.exports=mongoose.model('Producto',productoSchema);