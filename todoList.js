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
    handlers.init(req, next);
})

.use(express.static(__dirname + '/views'))

.disable('x-powered-by')

.use(urlencodedParser = bodyParser.urlencoded({ extended: false }))

.use(bodyParser.json())

.post('/load', function(req, res, next) {
    handlers.loader(req, res);
})

.get('/', function(req, res) {
    handlers.todoList(req, res);
})

.get('/todolist', function(req, res) {
    handlers.todoList(req, res);
})

.post('/todolist/ajouter', function(req, res) {
    handlers.ajouter(req, res);
})

.get('/todolist/supprimer', function(req, res) {
    handlers.supprimer(req, res);
})

.get('/deconnexion', function(req, res) {
    handlers.deconnexion(req, res);
})

.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

app.listen(8080);