'use strict'
var express=require('express');
var router=express.Router();
var clientesRouter = require('../controllers/cliente.controller');
var multiparty=require('connect-multiparty');
var multupartyMiddleWare=multiparty({uploadDir:'./uploads'});

//guardar pelicula
router.post('/guardarCliente',clientesRouter.saveCliente);
//ver pelicula
router.get('/clientes',clientesRouter.getClientes);
//ver pelicula en particulas
router.get('/cliente/:id',clientesRouter.getCliente);

router.get('/clienteC/:cedula',clientesRouter.getClienteC);
//editar pelicula
router.put('/cliente/:id',clientesRouter.updateCliente);

//borrar pelicula
router.delete('/cliente/:id',clientesRouter.deleteCliente);

//login
router.post('/login',clientesRouter.login);

//logout
router.get('/logout',clientesRouter.logout);


module.exports=router; 