// app/route/produto.js

module.exports = function(app){
    var controller = app.controllers.produto;

    app.get('/produto', controller.listaProdutos);
    app.get('/produto/:id', controller.buscaProduto);

    return app;
}