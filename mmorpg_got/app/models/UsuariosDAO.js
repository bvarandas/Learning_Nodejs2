function UsuariosDAO(connection){
    this._connection = connection;
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    
    var dados = {
        operacao: "inserir",
        usuario: usuario,
        collection: "usuarios"
    };

    this._connection(dados);
};


UsuariosDAO.prototype.autenticar = function(req, res, dadosForm){
    var dados = {
        operacao: "autenticar",
        usuario: dadosForm,
        collection: "usuarios",
        
    };

    dados.callback = function (err, result)
    {
        if (result[0]!= undefined){

            req.session.autorizado  = true;
            req.session.usuario     = result[0].usuario;
            req.session.casa        = result[0].casa;

            
        }
        if (req.session.autorizado){
            res.redirect('jogo');

        }else{
            res.render('index', {validacao:{}});
        }
    };

    this._connection(dados);
}

module.exports = function(){
    return UsuariosDAO;
}