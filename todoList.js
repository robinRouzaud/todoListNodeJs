var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var handlers = require('./handlers').routeHandler;

var app = express();

app.use(cookieSession({
        name: 'session',
        secret: 'todoSecret'
    }
))

.use(function(req, res, next) {
    handlers.init(req, res, next);
})

.use(express.static(__dirname + '/views'))

.disable('x-powered-by')

.use(urlencodedParser = bodyParser.urlencoded({ extended: false }))

.use(bodyParser.json())

.post('/load', function(req, res, next) {
    handlers.loader(req, res);
})

.get('/', function(req, res) {
    //handlers.todoList(req, res);
    handlers.loader(req, res);
})

/*
.get('/todolist', function(req, res) {
    handlers.todoList(req, res);
})*/

.post('/todolist/ajouterTache', function(req, res) {
    handlers.ajouterTache(req, res);
})

.get('/todolist/supprimerTache', function(req, res) {
    handlers.supprimerTache(req, res);
})

.get('/deconnexion', function(req, res) {
    handlers.deconnexion(req, res);
})

.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

app.listen(8080);