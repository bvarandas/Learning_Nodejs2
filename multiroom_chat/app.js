/*importa as configurações do servidor**/
var app = require('./config/server');

/* parametrizar a porta de escuta*/
var server = app.listen(8080, function(){
    console.log('Servidor ON Line')
});

/* criar a conexão por websocket */
var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
    console.log('Usuário conectou');

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data) {

        /*Dialogo*/
        socket.emit('msgParaCliente', 
        {apelido: data.apelido, mensagem: data.mensagem}); ///

        socket.broadcast.emit('msgParaCliente', 
        {apelido: data.apelido, mensagem: data.mensagem});

        /*Pariticipantes*/
        if(parseInt(data.apelido_atualizado_nos_clientes)== 0)
        {
            socket.emit('participantesParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}); ///

            socket.broadcast.emit('participantesParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem});
        }

    });
});


