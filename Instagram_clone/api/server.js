var express     = require('express');
var bodyParser  = require('body-parser');
var mongodb     = require('mongodb');
var app         = express();
var objectId    = require('mongodb').ObjectId;
var multiparty  = require('connect-multiparty');
var fs          = require('fs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

var port = 8080;

app.listen(port);

var db = new mongodb.Db('instagram', new mongodb.Server('localhost', 27017,{}),{});

console.log('Servidor HTTP está escutando na porta 8080');

app.post('/api', function(req, res){
    res.setHeader('Access-Control-Allow-Origin','*');

    var date = new Date();
    time_stamp = date.getTime();

    var filename = time_stamp + '_' + req.files.arquivo.originalFilename;
    var path_origem = req.files.arquivo.path;
    var path_destino = './uploads/' + filename;

    var url_imagem = filename;

    fs.rename(path_origem, path_destino, function(err){
        if(err)
        {
            res.status(500).json({error: err});
            return;
        }

        var dados = {
            url_imagem: url_imagem,
            titulo: req.body.titulo
        };

        db.open(function(err, mongoClient){
            mongoClient.collection('postagens', function(err, collection){
                collection.insert(dados, function(err, records){
                    if (err) res.json(err); else res.json({status: 'inclusão realizada com sucesso'});
                    mongoClient.close();
                });
            });
        });
    });
});


app.get('/api', function(req, res){

    res.setHeader('Access-Control-Allow-Origin','*');
    
    db.open(function(err, mongoClient){
        mongoClient.collection('postagens', function(err, collection){
            collection.find().toArray(function(err, results){
                if (err) res.json(err); else res.json(results);
                mongoClient.close();
            });
        });
    });
    //res.send(dados);
});


app.get('/api/:id', function(req, res){
    
    db.open(function(err, mongoClient){
        mongoClient.collection('postagens', function(err, collection){

            collection.find({_id: objectId(req.params.id)}).toArray(function(err, results){
                if (err) res.json(err); else res.status(200).json(results);
                mongoClient.close();
            });
        });
    });
    //res.send(dados);
});


app.put('/api/:id', function(req, res){
    
    db.open(function(err, mongoClient){
        mongoClient.collection('postagens', function(err, collection){

            collection.update( 
                {_id: objectId(req.params.id)},
                {$set : {titulo: req.body.titulo}},
                {},
                function(err, records){
                    console.log(records);
                    if (err) res.json(err); else res.json(records);
                    mongoClient.close();
                });
        });
    });
});

app.delete('/api/:id', function(req, res){
    
    db.open(function(err, mongoClient){
        mongoClient.collection('postagens', function(err, collection){

            collection.remove( 
                {_id: objectId(req.params.id)},
                function(err, records){
                    console.log(records);
                    if (err) res.json(err); else res.json(records);
                    mongoClient.close();
                });
        });
    });
});