'use strict'
var mongoose = require('mongoose');
var port = '3700';
mongoose.promise = global.Promise;
mongoose.set("strictQuery",false);
var app=require('./app');
mongoose.connect('mongodb://127.0.0.1:27017/chocolates')
.then(()=>{
    console.log("Conexión establecida con la BDD")
    app.listen(port,()=>{
        console.log("Conexión establecida en el url: localhost:3700");
    })
})
.catch(err=>console.log(err))