'use strict'
var Chocolate=require('../models/chocolate');
var fs=require('fs');
var path=require('path');

var controller = {
    //Inicio
    getInicio:function(req,res){
        return res.status(201).send(
            "<h1>Buenas Buenas, este es el BackEnd xd</h1>"
        );
    },
    //Guardar un chocolate
    saveChocolate:function(req,res){
        var chocolate=new Chocolate();
        var params=req.body;

        chocolate.nombre=params.nombre;
        chocolate.precio=params.precio;
        chocolate.tipo=params.tipo;
        chocolate.descripcion=params.descripcion;
        chocolate.imagen=null;
                

        chocolate.save((err,chocolateGuardado)=>{
            if (err) return res.status(500).send({message:"Error al guardar el chocolate"});
            if(!chocolateGuardado) return res.status(404).send({message:'No se ha guardado el chocolate'});
            return res.status(200).send({chocolate: chocolateGuardado});
        })
    },
    //Obtener chocolates
    getChocolates:function(req,res){
        Chocolate.find({}).sort().exec((err,chocolatesG)=>{
            if (err) return res.status(500).send({message:"Error al recuparar los datos de los chocolates"});
            if(!chocolatesG) return res.status(404).send({message:'No existen chocolates'});
            return res.status(200).send({chocolatesG});
        })
    },
    //Obtener un chocolate
    getChocolate:function(req,res){
        var chocolateId=req.params.id;
        if(chocolateId==null) return res.status(404).send({message:"El chocolate no existe"});

        Chocolate.findById(chocolateId,(err,chocolateG)=>{
            if (err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!chocolateG) return res.status(404).send({message:'El chocolate no existe'});
            return res.status(200).send({chocolateG});
        })
    },
    //Eliminar un chocolate
    deleteChocolate:function(req,res){
        var chocolateId=req.params.id;

        Chocolate.findByIdAndRemove(chocolateId,(err,chocolateD)=>{
            if (err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!chocolateD) return res.status(404).send({message:'No se puede eliminar el chocolate'});
            return res.status(200).send({chocolateD});
        })
    },
    //Modificar un chocolate
    updateChocolate:function(req,res){
        var chocolateId=req.params.id;
        var update=req.body;

        Chocolate.findByIdAndUpdate(chocolateId,update,{new:true},(err,chocolateU)=>{
            if (err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!chocolateU) return res.status(404).send({message:'No se puede actualizar los datos del chocolate'});
            return res.status(200).send({chocolateU});
        })
    },
    //Subir una imagen
    uploadImage:function(req,res){
        var chocolateId=req.params.id;
        var fileName="Imagen no subida";

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.'); //Ojo acá
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Chocolate.findByIdAndUpdate(chocolateId,{imagen:fileName},{new:true},(err,imagenU)=>{
                    if (err) return res.status(500).send({message:"La imagen no se ha subido"});
                    if(!imagenU) return res.status(404).send({message:'El chocolate no existe y no se subió la imagen'});
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
    //Resto de funciones CRUDE que se me pueden ocurrir xd
}
module.exports=controller;