'use strict'
var express = require('express');
var podyParser = require('body-parser');
const bodyParser = require('body-parser');
var app = express();
var chocolatesRoutes=require('./routes/chocolates.routes');
var clienteRoutes=require('./routes/clientes.routes');
var comentarioRoutes=require('./routes/comentarios.routes');
var administradorRoutes=require('./routes/administradores.routes');
var articuloRoutes=require('./routes/articulos.routes');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, X-Request-With, Content-Type,Accept, Access-Control-Allow, Request-Method')
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});
/*
app.get('/',(req,res)=>{
    res.status(468).send(
        "<h1>El Backend Funciona</h1>"
    )
})*/
app.use('/', chocolatesRoutes)
app.use('/', clienteRoutes)
app.use('/', comentarioRoutes)
app.use('/',administradorRoutes)
app.use('/',articuloRoutes)
module.exports=app;
