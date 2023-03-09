'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var articuloSchema=Schema({
    numero:Number,
    titulo:String,
    texto:String,
    imagen:String,
    tipo:String
})
module.exports=mongoose.model('Articulo',articuloSchema);