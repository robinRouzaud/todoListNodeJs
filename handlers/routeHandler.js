/*
Route handler file
*/
var dao = require('../dao');

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
        dao.UserDAO.findUserByEmailAndPassword(req.body.username.toString(), req.body.password.toString())
        .then(function(user) {
            req.session.username = user.eMail.toString();

            dao.TaskListDAO.findTaskListByUserId(user.userId.toString())
            .then(function(taskList) {
                if(taskList === null) {
                    return res.render('todoPage.ejs', {
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
                    return res.render('todoPage.ejs', {
                        username: req.session.username, 
                        taskListName: req.session.taskList,
                        taches: req.session.taches
                    });
                });
                }
            });
        
        })
        .catch((err) => {
            console.log('User not found!');
            //console.log(err);
            console.error(err);
            return res.render('accueil.ejs', {
                wrongPassword: true
            });
        });
    } else {
        return res.render('todoPage.ejs', {
            username: req.session.username, 
            taskListName: req.session.taskList,
            taches: req.session.taches
        });
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