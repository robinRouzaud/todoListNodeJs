var express = require('express');
var url = require('url');
var querystring = require('querystring');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var dao = require('./dao');
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
    if (req.session.username === '')
        res.render('accueil.ejs', {
            wrongPassword: false
        });
    else {
        dao.TaskDAO.createTask(req.body.task.toString(), req.session.listeId)
        
        .then(function(task) {
            req.session.taches.push(task.dataValues);
        })

        .then(function() {
            res.redirect('/');
        });
    }
})

.get('/todolist/supprimer', function(req, res) {
    var taskIdToDelete = querystring.parse(url.parse(req.url).query).id;
    var j = 0;
    dao.TaskDAO.deleteTaskById(taskIdToDelete)

    .then(
        req.session.taches.forEach(function(elt) {
            if(elt.taskId === taskIdToDelete) {
                req.session.taches.splice(j, 1);
            }
            j++;
        })
    )

    .then(
        res.redirect('/')
    );
})

.get('/deconnexion', function(req, res) {
    req.session.username = '';
    req.session.eMail = '';
    req.session.nomListeTache = '';
    req.session.taches = [];
    res.render('accueil.ejs', {
        wrongPassword: false
    })
})

.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

app.listen(8080);