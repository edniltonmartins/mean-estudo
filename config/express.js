var express = require('express');
var load = require('express-load');
var home = require('../app/routes/home');

module.exports = function(){
    var app = express();

    //Adicionando configurações
    app.set('port',3000);

    //Adicionando a pasta onde estão os estáticos
    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    home(app);

    load('models', {cwd:'app'})
    .then('controllers')
    .then('routes')
    .into(app);

    return app;
}