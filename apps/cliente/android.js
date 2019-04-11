var http = require('http');

var buffer_corpo_response =[];

var opcoes = {
    hostname: 'localhost',
    port: 8080,
    path: '/teste',
    method: 'get',
    headers: {
        'Accept':'application/json',
        //'Content-type': 'application/x-www-form-urlencoded'
        'Content-type' : 'application/json'
    }
}

//Content-type //x-www-form-urlencoded
var html = 'nome=José';
var json = {nome: 'José'};
var req = http.request(opcoes, function(res) {

    res.on('data', function(chunck){
        buffer_corpo_response.push(chunck)
    });

    res.on('end', function(){
        var corpo_responde = Buffer.concat(buffer_corpo_response).toString();
        console.log(corpo_responde);
        console.log(res.statusCode);
    });
});

req.write( JSON.stringify(json));

req.end();