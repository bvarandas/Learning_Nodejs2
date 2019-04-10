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


module.exports = function(){
    return UsuariosDAO;
}