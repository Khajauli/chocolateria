'use strict'
var express=require('express');
var router=express.Router();
var imagenRouter=require('../controllers/imagen.controller');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({uploadDir:'./uploads'});

//Funciones CRUDE
//Inicio
router.get('/inicio',imagenRouter.getInicio);
//Guardar un chocolate
router.post('/guardarImagen',imagenRouter.saveImagen);
//Obtener chocolates
router.get('/imagenes',imagenRouter.getImagenes);
//chocolates por categoria
router.get('/imagenesT/:tipo',imagenRouter.getImagenT);
//Obtener un chocolate
router.get('/imagen/:id',imagenRouter.getImagen);
//Modificar un chocolate
router.put('/editarImagen/:id',imagenRouter.updateImagen);
//Eliminar un chocolate
router.delete('/borrarImagen/:id',imagenRouter.deleteImagen);
//Subir una imagen
router.post('/subirImagenI/:id', multipartyMiddleware, imagenRouter.uploadImage);
//Obtener una imagen
router.get('/getImagenI/:imagen',imagenRouter.getImage);
module.exports=router;
