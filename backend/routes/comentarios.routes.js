'use strict'
var express=require('express');
var router=express.Router();
var comentarioRouter = require('../controllers/comentario.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});
//pagina de home
router.get('/inicio',comentarioRouter.getInicio);


router.post('/guardarComentario',comentarioRouter.saveComentario);
router.get('/comentarios',comentarioRouter.getComentarios);
router.get('/comentario/:id',comentarioRouter.getComentario);

router.put('/comentario/:id',comentarioRouter.updateComentario);

router.delete('/comentario/:id',comentarioRouter.deleteComentario);

router.get('/comentariosProd/:id',comentarioRouter.getComentariosByProducto);

module.exports=router; 