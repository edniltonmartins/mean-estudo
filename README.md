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

<h3>View e template engine</h3>

Primeiramente teremos que instalar o ejs para termos páginas dinâmicas e templates</br>

Veja:</br>

npm install ejs --save

</br>
Reparemos que o --save faz com que a dependência seja adicionada no package.json
 
</br></br>

Agora devemos adicionar as configurações para que o express possa encontrar os templates e saiba onde está as suas páginas</br>

vejamos:

// config/express.js

// abaixo do middleware express.static

app.set('view engine', 'ejs');

app.set('views','./app/views');

</br>
Agora precisaremos de uma página com extensão ejs igual a index.html lá na pasta app/views que é onde dissemos para o express que estarão os templates</br>

<h3>Configurando rotas</h3>

Vamos criar um arquivo de rotas para cada um e receber a instância do express, desta forma poderemos reutilizar código</br>

Agora como fica o código do módulo:</br>

// app/routes/home.js
module.exports = function(app){
    app.get("/");
}</br>

Agora precisaremos colocar essa referência lá no server. Vejamos:

// config/express.js
...
var home = require('./app/routes/home')
...
// abaixo da configuração do último middleware
home(app);

<h3>Criando controllers</h3>

Para seguir o padrão MVC, então criaremos objetos que disponibilizam as rotas e chegam até as informações que serão colocadas no models a fim de chegarem até as views.

</br>

Vamos criar um controller na pasta app/controllers</br>

module.exports = function() {

    var controller = {};

    controller.index = function(req, res) {

    res.render('index', {nome: 'Express'});

};

return controller;
}

<h3>Passando o valor para variável nome antes de processar o template</h3>

Veja:

res.render('index', {nome: 'Express'});

<h3>Ligando a rota ao controller</h3>

Veja:

// app/routes/home.js
var controller = require('../controllers/home')();

module.exports = function(app){
    app.get('/', controller.index);
    app.get('/index', controller.index);

};
