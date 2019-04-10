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

    //geração dos parametros
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.gerarParametros({
        usuario: dadosForm.usuario,
        moeda: 15,
        suditos:10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio:Math.floor(Math.random() * 1000),
        magia:Math.floor(Math.random() * 1000)
    });

    res.send('podemos cadastrar');
    //res.render('jogo',{img_casa: req.session.casa});

}