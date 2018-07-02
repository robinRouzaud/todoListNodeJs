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

.post('/login', function(req, res, next) {
    if (req.session.username === '') {
        dao.UserDAO.findUserByEmailAndPassword(req.body.username.toString(), req.body.password.toString())
        .then(function(user) {
            req.session.username = user.eMail.toString();
            dao.TaskListDAO.findTaskListByUserId(user.userId.toString())

            .then(function(taskList) {
                if(taskList === null) {
                    res.render('todoPage.ejs', {
                        username: req.session.username, 
                        taskListName: '',
                        taches: []
                    });
                } else {
                req.session.taskList = taskList.taskListName;
                dao.TaskDAO.findTasksByListId(taskList.taskListId.toString())

                .then(function(tasks) {
                    tasks.forEach(element => {
                        req.session.taches.push(element);
                    });

                })
                
                .then(function() {
                    res.render('todoPage.ejs', {
                        username: req.session.username, 
                        taskListName: req.session.taskList,
                        taches: req.session.taches
                    });
                });
                }
            });
        
        })
        .catch((err) => {
            console.log('User not found!!!!!!');
            console.log(err);
            res.render('accueil.ejs', {
                wrongPassword: true
            });
            console.error(err);
        });
    } else {
        res.render('todoPage.ejs', {
            username: req.session.username, 
            taskListName: req.session.taskList,
            taches: req.session.taches
        });
    }

})

.get('/', function(req, res) {
    if (req.session.username === '') {
        res.render('accueil.ejs', {
            wrongPassword: false
        });
    }
    else {
        res.render('todoPage.ejs', {
            username: req.session.username,
            taskListName: req.session.taskList,
            taches: req.session.taches
        });
    }
})

.get('/todolist', function(req, res) {
    if (req.session.username === '')
        res.render('accueil.ejs', {
            wrongPassword: false
        });
    else
        res.render('todoPage.ejs', {
            username: req.session.username,
            taskListName: req.session.taskList,
            taches: req.session.taches
        });
})

.post('/todolist/ajouter', function(req, res) {
    if (req.session.username === '')
        res.render('accueil.ejs', {
            wrongPassword: false
        });
    else {    
        req.session.taches.push(req.body.task.toString());
        // On ajoute une tâche au cookie, on veut l'ajouter à la BDD
        // Une méthode viendra chercher la fonction: "ajouterTache()" issue d'une classe différente
        res.render('todoPage.ejs', {
            username: req.session.username,
            taskListName: req.session.taskList,
            taches: req.session.taches
        });
    }
})

.get('/todolist/supprimer', function(req, res) {
    //var taskToDelete = querystring.parse(url.parse(req.url).query);
    //var deletedTask = taches[idTaskToDelete['id']];
    var taskIdToDelete = querystring.parse(url.parse(req.url).query).id;
    var j = 0;

    dao.TaskDAO.deleteTaskById(taskIdToDelete)

    .then(
        res.redirect('/')
    );
/*
    req.session.taches.forEach(function(elt, index) {
        if(elt.taskId === taskIdToDelete) {
            //return index;
            console.log(elt.taskId.toString() + ' & ' + index);
            dao.TaskDAO.deleteTaskById(elt.taskId)

            .then(
                res.redirect('/')
            );
            
            console.log('Index à supprimer :' + index);
        }  
    });*/
    /*
    dao.taskDAO.deleteTaskById(req.session.taches.splice(j, 1).taskId.toString())

    .then(res.redirect('/'));
    */
    /*
    dao.taskDAO.deleteTaskById(req.session.taches.splice(j, 1).taskId.toString())
    
    .then(res.redirect('/'));
    */
    /*res.render('todoPage.ejs', {
        username: req.session.username,
        taskListName: req.session.taskList,
        taches: req.session.taches
    });*/
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