'use strict'
var express=require('express');
var router=express.Router();
var chocolateRouter=require('../controllers/chocolates.controllers');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty({uploadDir:'./uploads'});

//Funciones CRUDE
//Inicio
router.get('/inicio',chocolateRouter.getInicio);
//Guardar un chocolate
router.post('/guardar-chocolate',chocolateRouter.saveChocolate);
//Obtener chocolates
router.get('/chocolates',chocolateRouter.getChocolates);
//chocolates por categoria
router.get('/chocolatesC/:categoria',chocolateRouter.getChocolatesC);
//Obtener un chocolate
router.get('/chocolate/:id',chocolateRouter.getChocolate);
//Modificar un chocolate
router.put('/editar-chocolate/:id',chocolateRouter.updateChocolate);
//Eliminar un chocolate
router.delete('/borrar-chocolate/:id',chocolateRouter.deleteChocolate);
//Subir una imagen
router.post('/subir-imagen/:id', multipartyMiddleware, chocolateRouter.uploadImage);
//Obtener una imagen
router.get('/get-imagen/:imagen',chocolateRouter.getImage);
module.exports=router;
