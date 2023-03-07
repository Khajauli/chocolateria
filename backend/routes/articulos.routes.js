'use strict'
var express=require('express');
var router=express.Router();
var articuloRouter = require('../controllers/articulo.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});

//guardar pelicula
router.post('/guardarArticulo',articuloRouter.saveArticulo);
//ver pelicula
router.get('/articulos',articuloRouter.getArticulos);
//ver pelicula en particulas
router.get('/articulo/:id',articuloRouter.getArticulo);

router.get('/articuloP/:cedula',articuloRouter.getArticuloP);
//editar pelicula
router.put('/articulo/:id',articuloRouter.updateArticulo);

//borrar pelicula
router.delete('/articulo/:id',articuloRouter.deleteArticulo);



module.exports=router; 