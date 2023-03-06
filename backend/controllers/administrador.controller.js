'use strict'
var Administrador=require('../models/administrador');
const { exists } = require('../models/administrador');
var fs=require('fs');
var path=require('path');
var controller={

    saveAdmin:function(req,res){
        var administrador=new Administrador();
        var params=req.body;
        administrador.cedula=params.cedula;
        administrador.nombre=params.nombre;
        administrador.usuario=params.usuario;
        administrador.contrasenia=params.contrasenia;
        administrador.rol=params.rol;
        administrador.save((err,adminGuardado)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!adminGuardado) return res.status(404).send({message:'No se ha guardado el administrador'});
            return res.status(200).send({administrador:adminGuardado});
        })

    },
    login:function(req,res){
        var usuario=req.body.user;
        var contrasenia=req.body.contrasenia;
        var session=req.session;

        if(usuario==null || contrasenia==null) return res.status(404).send({message:'Datos incorrectos'});
        Administrador.findOne({usuario,contrasenia},(err,administrador)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!administrador) return res.status(404).send({message:'Usuario o constraseña incorrectos'});
            if(usuario==administrador.usuario && contrasenia==administrador.contrasenia){
                session.req.session;
                session.usuario=req.body.usuario;
                res.status(200).send({administrador});
            }
        })
    }
,      
    logout:function(req,res){
        req.session.destroy();
        res.status(200).send({message:"Sesion cerrada exitosamente"});
    },
    
    getAdmin:function(req,res){
        var adminId=req.params.id;
        if(adminId==null) return res.status(4004).send({message:"El usuario no existe"});
        Administrador.findById(adminId,(err,administrador)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!administrador) return res.status(404).send({message:'No la existe el administrador'});
            return res.status(200).send({administrador});
        })
    },
    getAdminC:function(req,res){
        var cedula=req.params.cedula;
        if(cedula==null) return res.status(4004).send({message:"El administradir no existe"});
        Administrador.find({cedula},(err,administrador)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!administrador) return res.status(404).send({message:'No la existe el administrador'});
            return res.status(200).send({administrador});
        })
    },
    getAdministradores:function(req,res){
        Administrador.find({}).sort().exec((err,administradores)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!administradores) return res.status(404).send({message:'No existen administradores'});
            return res.status(200).send({administradores});
        })
    },
    deleteAdministrador:function(req,res){
        var administradorId=req.params.id;
        if(administradorId==null) return res.status(4004).send({message:"El administrador no existe"});
        Administrador.findByIdAndRemove(administradorId,(err,adminBorrado)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!adminBorrado) return res.status(404).send({message:'No se puede eliminarla el administrador'});
            return res.status(200).send({adminBorrado});
        })
    },
    updateAdministrador:function(req,res){
        var administradorId=req.params.id;
        var update=req.body;
        if(administradorId==null) return res.status(4004).send({message:"El administrador no existe"});
        Administrador.findByIdAndUpdate(administradorId,update,{new:true},(err,adminActualizado)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!adminActualizado) return res.status(404).send({message:'No se puede actualizar los datos de administrador'});
            return res.status(200).send({adminActualizado});
        })
    }
}
module.exports=controller;