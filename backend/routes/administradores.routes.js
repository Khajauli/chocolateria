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
router.post('/loginAdmin',administradorRouter.login);

//logout
router.get('/logoutAdmin',administradorRouter.logout);

router.get('/profile', verifyToken, (req, res)=>{
    res.send(req.userId);
});



function verifyToken(req, res, next) {
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token == 'null'){
        return res.status(401).send('Unauthorize Request');
    }
    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}

router.post('/uniqueuser', administradorRouter.getAdmin);

module.exports=router; 