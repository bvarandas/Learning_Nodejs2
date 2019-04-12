var express = require('express');

var bodyParser = require('body-parser');

var mongodb = require('mongodb');

var app = express();

//body-parser 
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
var port = 8080;

app.listen(port);

var db = new mongodb.Db('instagram', new mongodb.Server('localhost', 27017,{}),{});

console.log('Servidor HTTP está escutando na porta 8080');

app.get('/', function(req, res){
    
    var resposta = {msg: 'Olá'};
    res.send(resposta);
});

app.post('/api', function(req, res){
    var dados = req.body;

    db.open(function(err, mongoClient){
        mongoClient.collection('postagens', function(err, collection){
            collection.insert(dados, function(err, records){
                if (err) res.json(err); else res.json(records);
                mongoClient.close();
            });
        });
    });
    //res.send(dados);
});