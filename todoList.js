var http = require('http');
var express = require('express');
var url = require('url');
var querystring = require('querystring');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();

app.use(cookieSession({
        name: 'session',
        secret: 'todoSecret'
    }
))

.use(function(req, res, next) {
    console.log(req)
    if(typeof(req.session.taches) === 'undefined') {
        req.session.taches = [];
    }
    next();
})

.use(express.static(__dirname + '/views'))

.disable('x-powered-by')

.use(urlencodedParser = bodyParser.urlencoded({ extended: false }))

.use(bodyParser.json())

.get('/', function(req, res) {
    res.render('accueil.ejs');
})

.get('/todolist', function(req, res) {
    res.render('todoPage.ejs', {taches: req.session.taches});
})

.post('/todolist/ajouter', function(req, res) {
    req.session.taches.push(req.body.task.toString());
    //console.log(taches);
    res.render('todoPage.ejs', {taches: req.session.taches});
})

.get('/todolist/supprimer', function(req, res) {
    var taskToDelete = querystring.parse(url.parse(req.url).query);
    //var deletedTask = taches[idTaskToDelete['id']];
    req.session.taches.splice(taskToDelete['id'], 1);
    res.render('todoPage.ejs', {taches: req.session.taches});
})

.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

app.listen(8080);