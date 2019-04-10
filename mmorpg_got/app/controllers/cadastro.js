module.exports.cadastro = function(application, req, res){
    res.render('cadastro', {validacao:{}, dadosForm:{}});
}

module.exports.cadastrar = function(application, req,res)
{
    var dadosForm = req.body;

    req.assert('nome', 'Não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário pode ser vazio').notEmpty();
    req.assert('senha', 'Senha pode ser vazio').notEmpty();
    req.assert('casa', 'Casa pode ser vazio').notEmpty();

    var erros = req.validationErrors();

    if (erros)
    {
        res.render('cadastro', {validacao: erros, dadosForm: dadosForm});

        return;
    }

    var connection = application.config.dbConnection;

    var ususariosDAO = new application.app.models.UsuariosDAO(connection);
    
    ususariosDAO.inserirUsuario(dadosForm);

    res.send('podemos cadastrar');

}