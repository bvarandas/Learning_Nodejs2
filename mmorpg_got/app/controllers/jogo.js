module.exports.jogo = function(application, req, res){

    if (req.session.autorizado!== true){
        res.send('Usuário precisa efetuar o login');
        return;
    }    
    
    var msg = 'N';
    if ( req.query.msg != '' ){
        msg = req.query.msg;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.iniciaJogo(req, res, req.session.usuario, msg);
    
}

module.exports.sair = function(application, req, res){
    req.session.destroy(function(err){
        res.render('index', {validacao:{}, msg:{}});
    });
}

module.exports.suditos = function(application, req, res){
    if (req.session.autorizado!== true){
        res.send('Usuário precisa efetuar o login');
        return;
    } 
    res.render('aldeoes', {validacao:{}});
}

module.exports.pergaminhos = function(application, req, res){
    if (req.session.autorizado!== true){
        res.send('Usuário precisa efetuar o login');
        return;
    } 

    /*recuperar as ações inseridas no banco de dados*/
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    JogoDAO.getAcoes(req, res, req.session.usuario, "");

    //res.render('pergaminhos', {validacao:{}});
}

module.exports.ordenar_acao_sudito = function(application, req, res){
    var dadosForm = req.body;

    req.assert('acao','Ação deve ser informada').notEmpty();
    req.assert('quantidade','Quantidade devve ser informada').notEmpty();

    var erros = req.validationErrors();

    if(erros)
    {
        res.redirect('jogo?msg=A');
        return;
    }

    var connection = application.config.dbConnection;
    
    var JogoDAO = new application.app.models.JogoDAO(connection);
    
    dadosForm.usuario = req.session.usuario;
    
    JogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');
}

module.exports.revogar_acao = function(application, req, res){
    var url_query = req.query;
    
    var connection = application.config.dbConnection;
    
    var JogoDAO = new application.app.models.JogoDAO(connection);

    var _id = url_query.id_acao;

    JogoDAO.revogarAcao(_id, req.session.usuario, res);
    //res.send(url_query);
}