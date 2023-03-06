'use strict'
var express=require('express');
var router=express.Router();
var administradorRouter = require('../controllers/administrador.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});

//guardar pelicula
router.post('/guardarAdmin',administradorRouter.saveAdmin);
//ver pelicula
router.get('/administradores',administradorRouter.getAdministradores);
//ver pelicula en particulas
router.get('/administrador/:id',administradorRouter.getAdmin);

router.get('/administradorC/:cedula',administradorRouter.getAdminC);
//editar pelicula
router.put('/administrador/:id',administradorRouter.updateAdministrador);

//borrar pelicula
router.delete('/administrador/:id',administradorRouter.deleteAdministrador);

//login
router.post('/login',administradorRouter.login);

//logout
router.get('/logout',administradorRouter.logout);


module.exports=router; 