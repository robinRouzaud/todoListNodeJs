var http = require('http');
var express = require('express');
var url = require('url');
var querystring = require('querystring');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var app = express();

var taches = [];

app.use(express.static(__dirname + '/views'))
.use(cookieSession({
    secret: 'todoSecret'}
))

.use(urlencodedParser = bodyParser.urlencoded({ extended: false }))

.use(bodyParser.json())

.get('/', function(req, res) {
    res.render('accueil.ejs');
})

.get('/todolist', function(req, res) {
    res.render('todoListPage.ejs');
})

.post('/todolist/ajouter', function(req, res) {
    taches.push(req.body.task.toString());
    console.log(taches);
    res.render('todoPage.ejs', {taches: taches})
})

.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

/*Implémentation de la ToDo list:
Dans un premier temps on veut afficher un input text et un bouton valider. OK
Lorsque je rentre une tâche (contrôler que l'utilisateur ne rentre pas une chaîne de caractères vide)
et que l'on appuie sur "valider", la tâche doit être ajoutée à la liste.
*/



app.listen(8080);