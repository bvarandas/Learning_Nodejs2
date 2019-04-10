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
        //var server = new mongo.Server('localhost', 27017, {});

        //var db = new mongo.Db('got', server,  {});

        //return db;
    });
}
function query(db, dados)
{
    console.log(dados);

    var collection = db.collection(dados.collection);

    switch(dados.operacao)
    {
        case "inserir":
            collection.insertOne(dados.usuario, dados.callback);
            console.log("Inserção -> OK!!!!")
        break;
    }



}
module.exports = function(){
    return connMongoDB;

}