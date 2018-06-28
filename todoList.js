var http = require('http');
var express = require('express');
var url = require('url');
var querystring = require('querystring');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var dao = require('./dao');

var app = express();

app.use(cookieSession({
        name: 'session',
        secret: 'todoSecret'
    }
))

.use(function(req, res, next) {
    if(typeof(req.session.username) === 'undefined') {
        req.session.username = '';
    }
    if(typeof(req.session.userId) === 'undefined') {
        req.session.userId = '';
    }
    if(typeof(req.session.nomListeTache) === 'undefined') {
        req.session.nomListeTache = '';
    }
    if(typeof(req.session.taches) === 'undefined') {
        req.session.taches = [];
    }
    next();
})

.use(express.static(__dirname + '/views'))

.disable('x-powered-by')

.use(urlencodedParser = bodyParser.urlencoded({ extended: false }))

.use(bodyParser.json())

.post('/login', function(req, res) {
    console.log(typeof(req.session.username));
    dao.UserDAO.findUserByEmail(req.body.username.toString())
        
    .then(function(user) {
        req.session.username = user.eMail.toString();
        dao.TaskListDAO.findTaskListByUserId(user.userId.toString())

        .then(function(taskList) {
            req.session.taskList = taskList.taskListName;
            dao.TaskDAO.findTasksByListId(taskList.taskListId.toString())

            .then(function(tasks) {
                tasks.forEach(element => {
                    req.session.taches.push(element.taskName.toString());
                });

            })
            
            .then(function() {
                res.render('todoPage.ejs', {username: req.session.username, taskListName: req.session.taskList,taches: req.session.taches});
            });

        });

    });
    
})

.get('/', function(req, res) {
    res.render('accueil.ejs');
})

.get('/todolist', function(req, res) {
    res.render('todoPage.ejs', 
        {username: req.session.username,
        taskListName: req.session.taskList,
        taches: req.session.taches});
})

.post('/todolist/ajouter', function(req, res) {
    req.session.taches.push(req.body.task.toString());
    // On ajoute une tâche au cookie, on veut l'ajouter à la BDD
    // Une méthode vient chercher la tâche: "ajouterTache()" issue d'une classe différente
    res.render('todoPage.ejs', 
        {username: req.session.username,
        taskListName: req.session.taskList,
        taches: req.session.taches});
})

.get('/todolist/supprimer', function(req, res) {
    var taskToDelete = querystring.parse(url.parse(req.url).query);
    //var deletedTask = taches[idTaskToDelete['id']];
    req.session.taches.splice(taskToDelete['id'], 1);
    res.render('todoPage.ejs', 
        {username: req.session.username,
        taskListName: req.session.taskList,
        taches: req.session.taches});
})

.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

app.listen(8080);