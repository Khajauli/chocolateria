'use strict'
var Cliente=require('../models/cliente');
const { exists } = require('../models/cliente');
var nodemailer = require('nodemailer');
var fs=require('fs');
var path=require('path');
var controller={

    saveCliente: async function(req, res) {
        try {
          const {nombre, correo } = req.body;
      
      
          const existingCliente = await Cliente.findOne({ correo });
          if (existingCliente) {
            return res.status(404).send({ message: 'Ya existe el Cliente' });
          }
          
          // create a new client object and save to database
          const nuevoCliente = new Cliente({
            nombre,
            correo,
          });
          const clienteGuardado = await nuevoCliente.save();
          // send email
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'proyectobanco23@gmail.com',
              pass: 'cudjssnyqoioxqem'
            }
          });
      
          const emailTemplate = `
          <html>

          <head>
            <meta charset="utf-8">
            <title>Chocolate Shop Newsletter</title>
           
          </head>
          </head>
          <body style="background-color: #f7e9e3; padding: 30px; margin: 0;">
              <div style="background-color: #edd5c0; padding: 20px; max-width: 800px; margin: 0 auto;">
                <div style="text-align: center;">
                  <img src="https://static.vecteezy.com/system/resources/previews/011/048/628/original/chocolate-bar-3d-render-png.png" alt="Chocolate Shop Logo" style="height: 80px; width: 80px; margin-bottom: 20px;">
                  <h1 style="font-family: 'Brush Script MT', cursive; font-size: 48px; color: #704214; margin-bottom: 20px;">Bienvenidos al newsletter de Ariq</h1>
                </div>
                <div style="background-color: #f7e9e3; padding: 20px; border: 2px solid #edd5c0; border-radius: 10px;">
                  <p style="font-size: 18px; color: #704214; margin-bottom: 20px;">Hola ${nombre},</p>
                  <p style="font-size: 18px; color: #704214; margin-bottom: 20px;">Gracias por unirte a nuestra newsletter de la chocolatería. Aquí te compartimos algunos beneficios exclusivos que podrás disfrutar como suscriptor:</p>
                  <ul style="font-size: 18px; color: #704214;margin-left: 30px; margin-bottom: 20px;">
                    <li>Descuentos especiales en todos nuestros productos</li>
                    <li>Promociones exclusivas para suscriptores</li>
                    <li>Notificaciones anticipadas de nuevos productos</li>
                    <li>Invitaciones a eventos especiales</li>
                  </ul>
                  <p style="font-size: 18px; color: #704214; margin-bottom: 20px;">Esperamos verte pronto en nuestra tienda y que disfrutes de los mejores chocolates artesanales.</p>
                  <div style="text-align: center;">
                    <img src="https://cdn.pixabay.com/photo/2015/03/26/23/09/cake-pops-693645_960_720.jpg" alt="Chocolate Shop Image" style="height: 300px; width: 500px;">
                  </div>
                </div>
              </div>
            </body>
          </html>
          `;
      
          const mailOptions = {
            from: 'proyectobanco23@gmail.com',
            to: correo,
            subject: 'Ariq newsletter',
            html: emailTemplate
          };
      
          const info = await transporter.sendMail(mailOptions);
          console.log(`Message sent: ${info.messageId}`);
        
          return res.status(200).send({ cliente: clienteGuardado });
        } catch (err) {
          console.error(err);
          return res.status(500).send({ message: 'Error al guardar' });
        }
      },
    login:function(req,res){
        var usuario=req.body.usuario;
        var contrasenia=req.body.contrasenia;
        var session=req.session;

        if(usuario==null || contrasenia==null) return res.status(404).send({message:'Datos incorrectos'});
        Cliente.findOne({usuario,password},(err,cliente)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!cliente) return res.status(404).send({message:'Usuario o constraseña incorrectos'});
            if(usuario==cliente.usuario && contrasenia==cliente.contrasenia){
                session.req.session;
                session.usuario=req.body.usuario;
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
    getClienteC:function(req,res){
        var cedula=req.params.cedula;
        if(cedula==null) return res.status(4004).send({message:"El cliente no existe"});
        Cliente.find({cedula},(err,cliente)=>{
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
        if(clienteId==null) return res.status(4004).send({message:"El cliente no existe"});
        Cliente.findByIdAndRemove(clienteId,(err,clienteBorrado)=>{
            if(err) return res.status(500).send({message:"Error al eliminar los datos"});
            if(!clienteBorrado) return res.status(404).send({message:'No se puede eliminarla el cliente'});
            return res.status(200).send({clienteBorrado});
        })
    },
    updateCliente:function(req,res){
        var clienteId=req.params.id;
        var update=req.body;
        if(clienteId==null) return res.status(4004).send({message:"El cliente no existe"});
        Cliente.findByIdAndUpdate(clienteId,update,{new:true},(err,clienteActualizado)=>{
            if(err) return res.status(500).send({message:"Error al actualizar los datos"});
            if(!clienteActualizado) return res.status(404).send({message:'No se puede actualizar el cliente'});
            return res.status(200).send({clienteActualizado});
        })
    }
}
module.exports=controller;