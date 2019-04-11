module.exports.home = function (application, req, res)
{
    res.render('index', {validacao:{}, msg:{}});
}

module.exports.autenticar = function(application, req, res)
{

    var dadosForm = req.body;

    req.assert('usuario','Usuário não deve ser vazio').notEmpty();
    req.assert('senha','Senha não deve ser vazio').notEmpty();

    var erros = req.validationErrors();

    if (erros)
    {
        res.render('index', {validacao:erros, msg:{}});
        return;
    }
    
    var connection = application.config.dbConnection;

    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(req, res,dadosForm);

    //res.send('Tudo ok para criar a sessão');
}