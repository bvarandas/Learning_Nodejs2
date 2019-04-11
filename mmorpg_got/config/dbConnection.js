/*importar o mongodb*/
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbName = 'got';
var url = "mongodb://localhost:27017/";

var connMongoDB = function(dados)
{
    mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        //assert.equal(null, err);
        console.log('Connected sucesfuly to server');
        
        const dbo = db.db(dbName);

        query(dbo, dados);

        db.close();
    });
}
function query(db, dados)
{
    var user = dados.usuario;

    var collection = db.collection(dados.collection);

    switch(dados.operacao)
    {
        case "inserir":
            collection.insertOne(dados.usuario, dados.callback);
            console.log("Inserção -> OK!!!!")
        break;

        case "inserirParametros":
            collection.insertOne(dados.parametros, dados.callback);
        break;

        case "iniciaJogo":
            collection.find({usuario: dados.usuario}).toArray(dados.callback);
        break;
        case "acaoJogo":
            collection.insertOne(dados.acao, dados.callback);

            collection.update(
                {usuario:acao.usuario},
                {$inc:{moeda: moedas}}
            );
        break;
        case "autenticar":
            collection.find({ 
                usuario: {$eq: user.usuario}, 
                senha: {$eq: user.senha}
            }).toArray(dados.callback);
        break;

        case "getAcoes":
            var momento_atual = new Date().getTime();
            collection.find({usuario: dados.usuario, acao_termina_em: {$gt: momento_atual} }).toArray(dados.callback);
        break;
    }
}

module.exports = function(){
    return connMongoDB;

}