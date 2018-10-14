'use strict'

var mongoose= require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(()=>{
        console.log("conexion a la bd establecida con satisfactoriamente.");
        //creacion del servidor
        app.listen(port, ()=>{
            console.log("El servidor corriendo correctamente en la url localhost:3700");
        });
    })
    .catch(err => console.log(err));