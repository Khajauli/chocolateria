'use strict'
var Cliente=require('../models/cliente');
const { exists } = require('../models/cliente');
var fs=require('fs');
var path=require('path');
var controller={

    saveCliente:function(req,res){
        var cliente=new Cliente();
        var params=req.body;
        cliente.cedula=params.cedula;
        cliente.nombre=params.nombre;
        cliente.notifi=params.notifi;
        cliente.usuario=params.usuario;
        cliente.contrasenia=params.contrasenia;

        cliente.save((err,clienteGuardado)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!clienteGuardado) return res.status(404).send({message:'No se ha guardado el cliente'});
            return res.status(200).send({cliente:clienteGuardado});
        })

    },
    login:function(req,res){
        var user=req.body.user;
        var password=req.body.password;
        var session=req.session;

        if(user==null || password==null) return res.status(404).send({message:'Datos incorrectos'});
        Cliente.findOne({user,password},(err,cliente)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!cliente) return res.status(404).send({message:'Usuario o constraseña incorrectos'});
            if(user==cliente.user && password==cliente.password){
                session.req.session;
                session.user=req.body.user;
                res.status(200).send({cliente});
            }
        })
    }
,      
    logout:function(req,res){
        req.session.destroy();
        res.status(200).send({message:"Sesion cerrada exitosamente"});
    },
    
    getCliente:function(req,res){
        var clienteId=req.params.id;
        if(clienteId==null) return res.status(4004).send({message:"El usuario no existe"});
        Cliente.findById(usuarioId,(err,cliente)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!cliente) return res.status(404).send({message:'No la existe el cliente'});
            return res.status(200).send({cliente});
        })
    },
    getClientes:function(req,res){
        Cliente.find({}).sort().exec((err,clientes)=>{
            if(err) return res.status(500).send({message:"Error al recuperar los datos"});
            if(!clientes) return res.status(404).send({message:'No existen clientes'});
            return res.status(200).send({clientes});
        })
    },
    deleteCliente:function(req,res){
        var clienteId=req.params.id;
        if(clienteId==null) return res.status(4004).send({message:"La pelicula no existe"});
        Pelicula.findByIdAndRemove(clienteId,(err,clienteBorrado)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!clienteBorrado) return res.status(404).send({message:'No se puede eliminarla el cliente'});
            return res.status(200).send({clienteBorrado});
        })
    },
    updateCliente:function(req,res){
        var clienteId=req.params.id;
        var update=req.body;
        if(clienteId==null) return res.status(4004).send({message:"La pelicula no existe"});
        Cliente.findByIdAndUpdate(clienteId,update,{new:true},(err,clienteActualizado)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!clienteActualizado) return res.status(404).send({message:'No se puede actualizar pelicula'});
            return res.status(200).send({clienteActualizado});
        })
    }
}
module.exports=controller;