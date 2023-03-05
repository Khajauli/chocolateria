'use strict'
var mongoose=require('mongoose')
var Schema=mongoose.Schema;

var comentarioSchema=Schema({
    codigo:String,
    usuario:String,
    texto:String,
    aprobado:Boolean
})
module.exports=mongoose.model('Comentario',comentarioSchema);