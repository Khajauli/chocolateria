'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var articuloSchema=Schema({
    numero:Number,
    cliente:String,
    titulo:String,
    producto:String,
    comentario:String
})
module.exports=mongoose.model('Articulo',articuloSchema);