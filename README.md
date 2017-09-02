# mean-estudo

<h3>Começando com Node JS</h3>

Criando nosso primeiro Servidor com NodeJS

<h3>Vamos adicionar o Express para facilitar a nossa vida na criação de middlewares, rotas e segurança</h3>

Vamos instalar o express com o seguinte comando:</br>
npm install express --save

<h3>Começando com Express</h3>

Vamos criar um arquivo que carregará o express e suas configurações para toda a aplicação</br>

var express = require("express");

module.exports = function(){

    var app = express();

    return app;

};

</br>
Vamos criar um arquivo chamado server.js para carregar o express e coloca-lo como listener para o http.

Veja:</br>
var http = require("http");

var app = require("./config/express")();

http.createServer(app).listen(app.get('port'), function(){</br>
    console.log("Express server escutando na porta " + app.get("port"));</br>
}); </br>

<h3>Vamos agora adicionar a configuração de porta e páginas estáticas</h3>

Vejamos como ficou:</br>

// config/express.js</br>
var express = require('express');</br>
module.exports = function() {</br>
var app = express();</br>
// configuração de ambiente</br>
app.set('port', 3000);</br>
// middleware</br>
app.use(express.static('./public'));</br>
return app;</br>
};</br>

