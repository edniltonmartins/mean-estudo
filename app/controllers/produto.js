// app/controllers/produto

module.exports = function(){
    var controller = {};
    var produtos = [
                    {'_id':'1', 'nome':'coca'},
                    {'_id':'2', 'nome':'fanta'},
                    {'_id':'3','nome':'sprite'}
                    ];

    controller.listaProdutos = function(req, res){
        console.log(produtos);
        res.render('produto', {listaProdutos:produtos});
        //res.json(produtos);
    };

    controller.buscaProduto = function(req, res){
        var idProduto = req.params.id;
        var produto = produtos.filter(function(produto){
            return produto._id == idProduto;
        });
        
        produto ?
        res.json(produto) :
        res.status(404).send("O produto não foi encotrado");
        
        
    };
    return controller;
}