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

JogoDAO.prototype.iniciaJogo = function(req, res, usuario, msg)
{
    var dados = {
        operacao: "iniciaJogo",
        usuario: usuario,
        collection: "jogo"
    };

    dados.callback = function(err, result)
    {
        res.render('jogo', {img_casa: req.session.casa, jogo: result[0], msg: msg});
    };

    this._connection(dados);

}

JogoDAO.prototype.acao = function(acao)
{
    var date = new Date();
    var tempo = null;

    switch(parseInt( acao.acao))
    {
        case 1 : 
            tempo = 1 * 60 * 60000; 
        break;
        case 2 : 
            tempo =  2 * 60 * 60000; 
        break;
        case 3 : 
            tempo = 5 * 60 * 60000; 
        break;
        case 4 : 
            tempo = 5 * 60 * 60000; 
        break;
    }

    var moedas = 0;

    switch(parseInt(acao.acao))
    {
        case 1 : moedas = -2 * acao.quantidade ; break;
        case 2 : moedas = -3 * acao.quantidade ; break;
        case 3 : moedas = -1 * acao.quantidade ; break;
        case 4 : moedas = -1 * acao.quantidade ; break;
    }
    
    acao.acao_termina_em = date.getTime() + tempo;

    var dados = {
        operacao: "acaoJogo",
        acao: acao,
        collection: "acao",
        moedas: moedas
    };

    dados.callback = function(err, result)
    {
        //res.render('jogo', {img_casa: req.session.casa, jogo: result[0], comando_invalido: comando_invalido});
    };

    this._connection(dados);

}

JogoDAO.prototype.getAcoes = function(req, res, usuario, msg){
    var dados = {
        operacao: "getAcoes",
        usuario: usuario,
        collection: "acao"
    };

    dados.callback = function(err, result)
    {
        res.render('pergaminhos', { acoes: result, msg: msg});
    };

    this._connection(dados);
};

module.exports = function(){
    return JogoDAO;
}