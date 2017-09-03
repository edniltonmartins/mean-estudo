# mean-estudo

<h3>Começando com NodeJS</h3>

Criando nosso primeiro Servidor com <b>NodeJS</b>

<h3>Vamos adicionar o <b>Express</b> para facilitar a nossa vida na criação de middlewares, rotas e segurança</h3>

Vamos instalar o <b>Express</b> com o seguinte comando:

    npm install express --save

<h3>Começando com Express</h3>

Vamos criar um arquivo que carregará o <b>express</b> e suas configurações para toda a aplicação.

    var express = require("express");

    module.exports = function(){

        var app = express();
        return app;

    };

Vamos criar um arquivo chamado <b><i>server.js</i></b> para carregar o <b>Express</b> e coloca-lo como listener para o <b>http</b>.

Vejamos:

    var http = require("http");
    var app = require("./config/express")();

    http.createServer(app).listen(app.get('port'), function(){

        console.log("Express server escutando na porta " + app.get("port"));

    });

<h3>Vamos agora adicionar a configuração de porta e páginas estáticas</h3>

Vejamos como ficou:

    // config/express.js
    var express = require('express');

    module.exports = function() {
        var app = express();
        
        // configuração de ambiente
        <b>app.set('port', 3000);</b>
        
        // middleware
        <b>app.use(express.static('./public'));</b>

        return app;
    };

<h3>View e template engine</h3>

Primeiramente teremos que instalar o ejs para termos páginas dinâmicas e templates</br>

Vejamos:

    npm install ejs --save

Reparemos que o --save faz com que a dependência seja adicionada no package.json
 
Agora devemos adicionar as configurações para que o express possa encontrar os templates e saiba onde está as suas páginas

Vejamos:

    // config/express.js

    // abaixo do middleware express.static

    app.set('view engine', 'ejs');

    app.set('views','./app/views');

Agora precisaremos de uma página com extensão ejs igual a index.html lá na pasta app/views que é onde dissemos para o express que estarão os templates.

<h3>Configurando rotas</h3>

Vamos criar um arquivo de rotas para cada um e receber a instância do express, desta forma poderemos reutilizar código.

Agora como fica o código do módulo:

    // app/routes/home.js
    module.exports = function(app){
        app.get("/");
    }

Agora precisaremos colocar essa referência lá no server. 

Vejamos:

    // config/express.js
    ...
    var home = require('./app/routes/home')
    ...
    // abaixo da configuração do último middleware
    home(app);

<h3>Criando controllers</h3>

Para seguir o padrão MVC, então criaremos objetos que disponibilizam as rotas e chegam até as informações que serão colocadas no models a fim de chegarem até as views.

Vamos criar um controller na pasta app/controllers.

Vejamos:

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

É preciso fazer a rota estar ligada ao controller para que desta forma o controller popule um model e passe isso para a view.

Vejamos:

    // app/routes/home.js
    var controller = require('../controllers/home')();
 
    module.exports = function(app){
        app.get('/', controller.index);
        app.get('/index', controller.index);

    };

Vamos Perceber que a rota home aponta a url "/" e também a url "/index" para o metódo index do controller home. Perceba também que o controller em seu metodo index faz a renderização de uma view chamada index e passa para ela um parâmetro chamado nome com o valor "Express".

