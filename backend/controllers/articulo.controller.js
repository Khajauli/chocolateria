'use strict'
var Articulo=require('../models/articulo');
const { exists } = require('../models/articulo');
var fs=require('fs');
var path=require('path');
var controller={

    saveArticulo:function(req,res){
        var articulo=new Articulo();
        var params=req.body;
        articulo.numero=params.numero;
        articulo.cliente=params.cliente;
        articulo.titulo=params.titulo;
        articulo.comentario=params.comentario;
        articulo.producto=params.producto;
        articulo.save((err,articuloGuardado)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!articuloGuardado) return res.status(404).send({message:'No se ha guardado el articulo'});
            return res.status(200).send({articulo:articuloGuardado});
        })

    },

    getArticulo:function(req,res){
        var articuloId=req.params.id;
        if(articuloId==null) return res.status(4004).send({message:"El articulo no existe"});
        Articulo.findById(articuloId,(err,articulo)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!articulo) return res.status(404).send({message:'No la existe el articulo'});
            return res.status(200).send({articulo});
        })
    },
    getArticuloP:function(req,res){
        var producto=req.params.producto;
        if(producto==null) return res.status(4004).send({message:"El articulo no existe"});
        Articulo.find({producto},(err,articulo)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!articulo) return res.status(404).send({message:'No la existe el articulo'});
            return res.status(200).send({articulo});
        })
    },
    getArticulos:function(req,res){
        Articulos.find({}).sort().exec((err,articulos)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!articulos) return res.status(404).send({message:'No existen articulos'});
            return res.status(200).send({articulos});
        })
    },
    deleteArticulo:function(req,res){
        var articuloId=req.params.id;
        if(articuloId==null) return res.status(4004).send({message:"El articulo no existe"});
        Articulo.findByIdAndRemove(articuloId,(err,articuloBorrado)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!articuloBorrado) return res.status(404).send({message:'No se puede eliminarla el articulo'});
            return res.status(200).send({articuloBorrado});
        })
    },
    updateArticulo:function(req,res){
        var articuloId=req.params.id;
        var update=req.body;
        if(articuloId==null) return res.status(4004).send({message:"El articulo no existe"});
        Articulo.findByIdAndUpdate(articuloId,update,{new:true},(err,articuloActualizado)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!articuloActualizado) return res.status(404).send({message:'No se puede actualizar los datos del articulo'});
            return res.status(200).send({articuloActualizado});
        })
    }
}
module.exports=controller;