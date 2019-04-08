/* importar o modulo dp framework express*/
var express = require('express');

/*Importar o módulo consign */
var consign = require('consign');

/*Importar o moduo de body parser */
var bodyParser = require('body-parser');

/*Importar o módulo do express validator */
var expressValidator = require('express-validator');

/*Iniciando o objeto do express* */
var app = express();

/*configurar o ejs (engine de views) - setar a sviaruáveis (view engine) e views do express*/
app.set('view engine', 'ejs');
app.set('views','./app/views');

/*configurando o middleware express.static*/
app.use(express.static('./app/public'))

/* configurar o middleware body-parser*/
app.use(bodyParser.urlencoded({extended: true}));

/*configurar o middleware express -validator*/
app.use(expressValidator());

/* Efetua o autoload das rotas, dos models e dos controllers para o objeto app*/
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exporta o objeto para o app*/
module.exports = app;

