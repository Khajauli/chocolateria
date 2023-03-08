'use strict'
var Chocolate=require('../models/chocolate');
var Cliente=require('../models/cliente');
var nodemailer = require('nodemailer');
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
    saveChocolate: async function(req, res) {
        try {
          const chocolate = new Chocolate();
          const params = req.body;
          chocolate.nombre = params.nombre;
          chocolate.descripcion = params.descripcion;
          chocolate.precio = params.precio;
          chocolate.imagen = null;
          chocolate.puntuacion = params.puntuacion;
          chocolate.totales = params.totales;
          chocolate.categoria = params.categoria;
          chocolate.estado = params.estado;

          const ultimoCodigo = await Chocolate.findOne().sort({ codigo: -1 }).select({ codigo: 1 }).limit(1).exec();
          const nuevoCodigo = ultimoCodigo ? ultimoCodigo.codigo + 1 : 1;
          chocolate.codigo = nuevoCodigo;

      
          const chocolateGuardado = await chocolate.save();
      
          // Send email to clients with notifi set to true
          const clientes = await Cliente.find({ notifi: true });
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'proyectobanco23@gmail.com',
              pass: 'cudjssnyqoioxqem'
            }
          });
      
          for (const cliente of clientes) {
            const emailTemplate = `
            <html>
              <head>
                <meta charset="utf-8">
                <title>Chocolate Shop Newsletter</title>
              </head>
              <body style="background-color: #f7e9e3; padding: 30px; margin: 0;">
                <div style="background-color: #edd5c0; padding: 20px; max-width: 800px; margin: 0 auto;">
                  <div style="text-align: center;">
                    <img src="https://static.vecteezy.com/system/resources/previews/011/048/628/original/chocolate-bar-3d-render-png.png" alt="Chocolate Shop Logo" style="height: 80px; width: 80px; margin-bottom: 20px;">
                    <h1 style="font-family: 'Brush Script MT', cursive; font-size: 48px; color: #704214; margin-bottom: 20px;">Nuevo producto Ariq!!!</h1>
                  </div>
                  <div style="background-color: #f7e9e3; padding: 20px; border: 2px solid #edd5c0; border-radius: 10px;">
                    <p style="font-size: 18px; color: #704214; margin-bottom: 20px;">Hola ${cliente.nombre},</p>
                    <p style="font-size: 18px; color: #704214; margin-bottom: 20px;">Te informamos que acabamos de agregar un nuevo chocolate a nuestro catálogo:</p>
                    <ul style="font-size: 18px; color: #704214;margin-left: 30px; margin-bottom: 20px;">
                      <li>Nombre: ${chocolateGuardado.nombre}</li>
                      <li>Descripción: ${chocolateGuardado.descripcion}</li>
                      <li>Precio: ${chocolateGuardado.precio}</li>
                      <li>Puntuación: ${chocolateGuardado.puntacion} </li>
                    </ul>
                    <p style="font-size: 18px; color: #704214; margin-bottom: 20px;">¡No te lo pierdas!</p>
                    <div style="text-align: center;">
                      <h3>Con este correo recibe un 30% de descuento en tu compra </h3>
                    </div>
                  </div>
                </div>
              <//body>
              </html>`;
      
              const mailOptions = {
                from: 'proyectobanco23@gmail.com',
                to: cliente.correo,
                subject: 'Ariq newsletter',
                html: emailTemplate
              };
          
              const info = await transporter.sendMail(mailOptions);
              console.log(`Message sent: ${info.messageId}`);
            }
              return res.status(200).send({ chocolate: chocolateGuardado });
            } catch (err) {
              console.error(err);
              return res.status(500).send({ message: 'Error al guardar' });
            }
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