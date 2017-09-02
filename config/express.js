var express = require("express");

module.exports = function(){
    var app = express();

    //Adicionando configurações
    app.set("port",3000);

    //Adicionando a pasta onde estão os estáticos
    app.use(express.static("./public"));
    return app;
}