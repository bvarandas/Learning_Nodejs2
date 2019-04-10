function JogoDAO(connection){
    this._connection = connection;
}

JogoDAO.prototype.gerarParametros = function(parametros) {
    var dados = {
        operacao: "inserirParametros",
        parametros: parametros,
        collection: "jogo"
    };

    dados.callback = function(err, result)
    {

    };

    this._connection(dados);
};

JogoDAO.prototype.iniciaJogo = function(req, res, usuario, comando_invalido)
{
    var dados = {
        operacao: "iniciaJogo",
        usuario: usuario,
        collection: "jogo"
    };

    dados.callback = function(err, result)
    {
        res.render('jogo', {img_casa: req.session.casa, jogo: result[0]});
    };

    this._connection(dados);

}

module.exports = function(){
    return JogoDAO;
}