'use strict'
var Comentario=require('../models/comentario');
var fs=require('fs');
var path=require('path');
const { exists } = require('../models/comentario');
var controller={
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2<h1>"
        );
    },
    saveComentario:async function(req,res){
        const comentario = new Comentario();
        const params = req.body;
        comentario.codigo = params.codigo;
        comentario.usuario = params.usuario;
        comentario.texto = params.texto;
        comentario.aprobado = params.aprobado;
        comentario.puntaje = params.puntaje;

        try {
            const chocolate = await Chocolate.findOne({ codigo: params.producto });
            if (!chocolate) {
            return res.status(404).send({ message: 'No se ha encontrado el chocolate relacionado' });
            }

            comentario.producto = chocolate;

            const oldAvgScore = chocolate.puntuacion;
            const totalReviews = chocolate.totales;
            const newScore = comentario.puntaje;
            const newAvgScore = (oldAvgScore * totalReviews + newScore) / (totalReviews + 1);

            chocolate.puntuacion = newAvgScore;
            chocolate.totales = totalReviews + 1;
            await chocolate.save();

            comentario.save((err, comentarioGuardado) => {
            if (err) {
                return res.status(500).send({ message: 'Error al guardar el comentario' });
            }
            if (!comentarioGuardado) {
                return res.status(404).send({ message: 'No se ha guardado el comentario' });
            }
            return res.status(200).send({ comentario: comentarioGuardado });
            });
        } catch (err) {
            return res.status(500).send({ message: 'Error al buscar el chocolate relacionado' });
        }
    },
    //recuperar todas las peliculas
    getComentarios:function(req,res){
        Comentario.find({}).sort().exec((err,comentarios)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!comentarios) return res.status(404).send({message:'No existen comentarios'});
            return res.status(200).send({comentarios});
        })
    },
    getComentario:function(req,res){
        var comentarioId=req.params.id;
        if(comentarioId==null) return res.status(4004).send({message:"El comentario indicado no existe"});
        Comentario.findById(comentarioId,(err,comentario)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!comentario) return res.status(404).send({message:'No existe el comentario'});
            return res.status(200).send({comentario});
        })
    },
    deleteComentario:function(req,res){
        var comentarioId=req.params.id;
        if(comentarioId==null) return res.status(4004).send({message:"El comentario no existe"});
        Comentario.findByIdAndRemove(comentarioId,(err,comentarioBorrado)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!comentarioBorrado) return res.status(404).send({message:'No se puede eliminar el comentario'});
            return res.status(200).send({comentarioBorrado});
        })
    },
    updateComentario:function(req,res){
        var comentarioId=req.params.id;
        var update=req.body;
        if(comentarioId==null) return res.status(4004).send({message:"El comentario no existe"});
        Comentario.findByIdAndUpdate(comentarioId,update,{new:true},(err,comentarioActualizado)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!comentarioActualizado) return res.status(404).send({message:'No se puede actualizar el comentario'});
            return res.status(200).send({comentarioActualizado});
        })
    },
    getComentariosByProducto:function(req,res){
        var producto=req.params.producto;
        if(producto==null) return res.status(4004).send({message:"El comentario indicado no existe"});
        Comentario.find({producto},(err,comentarios)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!comentarios) return res.status(404).send({message:'No existe el comentario'});
            return res.status(200).send({comentarios});
        })
    }
    
    
}
module.exports=controller;