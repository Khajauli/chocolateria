'use strict'
var Administrador=require('../models/administrador');
const { exists } = require('../models/administrador');
const jwt = require('jsonwebtoken');
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
        administrador.save();
        const token = jwt.sign({_id: administrador._id}, 'secretkey');
        res.status(200).json({token}); 
    },
    login: async function(req,res){
        var params=req.body;
        var usuario=params.usuario;
        var contrasenia=params.contrasenia;
        var session=req.session;

        if(usuario==null || contrasenia==null) return res.status(404).send({message:'Datos incorrectos'});
        const user = await Administrador.findOne({usuario});
        if (!user) return res.status(401).send("El usuario no existe");
        if (user.contrasenia !== contrasenia) return res.status(401).send('Contraseña Incorrecta');
        const token = jwt.sign({_id: user._id}, 'secretkey');
        return res.status(200).json({token});
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