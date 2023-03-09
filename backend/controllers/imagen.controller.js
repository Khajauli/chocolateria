'use strict'
var Imagen=require('../models/imagen');
const { exists } = require('../models/imagen');
var fs=require('fs');
var path=require('path');
var controller={

    saveImagen:function(req,res){
        var imagen=new Imagen();
        var params=req.body;
        imagen.codigo=params.codigo;
        imagen.nombre=params.nombre;
        imagen.tipo=params.tipo;
        imagen.foto=null;
        imagen.save((err,imagenGuardada)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!imagenGuardada) return res.status(404).send({message:'No se ha guardado la imagen'});
            return res.status(200).send({imagen:imagenGuardada});
        })

    },

    getImagen:function(req,res){
        var imagenId=req.params.id;
        if(imagenId==null) return res.status(4004).send({message:"La imagen no existe"});
        Imagen.findById(imagenId,(err,imagen)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!imagen) return res.status(404).send({message:'No la existe la imagen'});
            return res.status(200).send({imagen});
        })
    },
    getImagenT:function(req,res){
        var tipo=req.params.tipo;
        if(tipo==null) return res.status(4004).send({message:"La imagen no existe"});
        Imagen.find({tipo},(err,imagen)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!imagen) return res.status(404).send({message:'No la existe la imagen'});
            return res.status(200).send({imagen});
        })
    },
    getImagenes:function(req,res){
        Imagen.find({}).sort().exec((err,imagenes)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!imagenes) return res.status(404).send({message:'No existen la imagen'});
            return res.status(200).send({imagenes});
        })
    },
    deleteImagen:function(req,res){
        var imagenId=req.params.id;
        if(imagenId==null) return res.status(4004).send({message:"la imagen no existe"});
        Imagen.findByIdAndRemove(imagenId,(err,imagenBorrada)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!imagenBorrada) return res.status(404).send({message:'No se puede eliminarla la imagen'});
            return res.status(200).send({imagenBorrada});
        })
    },
    updateImagen:function(req,res){
        var imagenId=req.params.id;
        var update=req.body;
        if(imagenId==null) return res.status(4004).send({message:"la imagenno existe"});
        Imagen.findByIdAndUpdate(imagenId,update,{new:true},(err,imagenActualizada)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!imagenActualizada) return res.status(404).send({message:'No se puede actualizar los datos de la imagen'});
            return res.status(200).send({imagenActualizada});
        })
    },

    uploadImage:function(req,res){
        var imagenId=req.params.id;
        var fileName="Imagen no subida";

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.'); //Ojo acá
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Imagen.findByIdAndUpdate(imagenId,{foto:fileName},{new:true},(err,imagenU)=>{
                    if (err) return res.status(500).send({message:"La imagen no se ha subido"});
                    if(!imagenU) return res.status(404).send({message:'La imagen no existe y no se subió la imagen'});
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