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
        articulo.titulo=params.titulo;
        articulo.texto=params.texto;
        articulo.tipo=params.tipo;
        articulo.estado=params.estado;
        articulo.imagen=null;
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
        var numero=req.params.numero;
        if(numero==null) return res.status(4004).send({message:"El articulo no existe"});
        Articulo.find({numero},(err,articulo)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!articulo) return res.status(404).send({message:'No la existe el articulo'});
            return res.status(200).send({articulo});
        })
    },
    getArticulos:function(req,res){
        Articulo.find({}).sort().exec((err,articulos)=>{
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
    },

    uploadImage:function(req,res){
        var articuloId=req.params.id;
        var fileName="Imagen no subida";

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.'); //Ojo acá
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Articulo.findByIdAndUpdate(articuloId,{imagen:fileName},{new:true},(err,imagenU)=>{
                    if (err) return res.status(500).send({message:"La imagen no se ha subido"});
                    if(!imagenU) return res.status(404).send({message:'El articulo no existe y no se subió la imagen'});
                    return res.status(200).send({imagenU});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:"La extensión no es válida"});
                })
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    //Obtener una imagen
    getImage:function(req,res){
        var file=req.params.imagen;
        var path_file="./uploads/"+file;
        fs.exists(path_file,(exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:"No existe la imagen"});
            }
        })
    }
}
module.exports=controller;