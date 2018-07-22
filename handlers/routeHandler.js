/*
Route handler file
*/
var dao = require('../dao');
var url = require('url');
var querystring = require('querystring');

module.exports.init = (req, next) => {
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
};

module.exports.loader = (req, res) => {
    if (req.session.username === '') {

        dao.UserDAO.findUserByEmailAndPassword(req.body.username, req.body.password)

        .then(function(user) {
            req.session.username = user.eMail.toString();
            req.session.userId   = user.userId.toString();
            loadTaskList(req.session.userId, req, res);        
        })
        .catch((err) => {
            console.log('User not found!');
            //console.log(err);
            console.error(err);
            return res.render('accueil.ejs', {
                wrongPassword: true
            });
        });
    } else if(req.session.username != '' && !(typeof(req.session.taches) === 'undefined')) {
        loadTaskList(req.session.userId, req, res);
    }
}

module.exports.todoList = (req, res) => {
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
}

module.exports.ajouter = (req, res) => {
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
}

module.exports.supprimer = (req, res) => {
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
}

module.exports.deconnexion = (req, res) => {
    req.session.username = '';
    req.session.eMail = '';
    req.session.nomListeTache = '';
    req.session.taches = [];
    res.render('accueil.ejs', {
        wrongPassword: false
    })
}

loadTaskList = (IdUser, req, res) => {
    dao.TaskListDAO.findTaskListByUserId(IdUser)

    .then(function(taskList) {

        if(taskList === null) {
            return res.render('todoPage.ejs', {
                username: req.session.username, 
                taskListName: '',
                taches: []
            });
        } else {
            req.session.taskList = taskList.taskListName;
            req.session.listeId  = taskList.taskListId;
            req.session.taches   = [];
            dao.TaskDAO.findTasksByListId(taskList.taskListId.toString())

            .then(function(tasks) {
                tasks.forEach(element => {
                    req.session.taches.push(element);
                });

            })
            
            .then(function() {
                return res.render('todoPage.ejs', {
                    username: req.session.username, 
                    taskListName: req.session.taskList,
                    taches: req.session.taches
                });
            });
        }
    });
}