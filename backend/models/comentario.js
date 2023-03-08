'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var comentarioSchema=Schema({
    codigo:String,
    producto:String,
    usuario:String,
    texto:String,
    aprobado:Boolean,
    puntaje:Number
})
module.exports=mongoose.model('Comentario',comentarioSchema);