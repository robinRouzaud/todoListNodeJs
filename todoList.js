var http = require('http');
var express = require('express');
var url = require('url');
var querystring = require('querystring');

var app = express();

app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send("On va essayer de faire une ToDo list dans cet exercice");
})
.get('/todolist', function(req, res) {
    res.render('todoListPage.ejs', {pasEncoreUneListe: 9});
})
.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

/*Implémentation de la ToDo list:
Dans un premier temps on veut afficher un input text et un bouton valider.
Lorsque je rentre une tâche (contrôler que l'utilisateur ne rentre pas une chaîne de caractères vides)
et que j'appuie sur "valider"), la tâche doit être ajoutée à la liste.
*/

/*
Un autre commentaire histoire de vérifier que tout commit bien
*/


app.listen(8080);