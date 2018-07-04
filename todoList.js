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
    if(typeof(req.session.listeId) === 'undefined') {
        req.session.listeId = '';
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
                req.session.listeId = taskList.taskListId;
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