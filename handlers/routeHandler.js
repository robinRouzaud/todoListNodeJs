/*
Route handler file
*/
var dao = require('../dao');
var url = require('url');
var querystring = require('querystring');

//Initialisation de la session de l'utilisateur
module.exports.init = (req, res, next) => {

    if(req.session.userId === undefined)
        req.session.userId = '';
    if(req.session.username === undefined)
        req.session.username = '';

    next();
};

//Enregistrement d'un utilisateur
module.exports.registration = (req, res) => {
    if(req.body.password1 === req.body.password2) {
        checkIfUserExists(req.body.email)
        .then(user => {
            if(user === null) {
                dao.UserDAO.createUser(
                    req.body.prenom,
                    req.body.nom,
                    req.body.email,
                    req.body.password1
                )
                .then((createdUser) => {
                    console.log('Utilisateur créé!');
                    req.session.userId = createdUser.userId;
                    req.session.username = createdUser.username;
                })
                .then(
                    res.redirect('/')
                );
            }
        })
        .catch(userExists => {
            res.render('accueil.ejs', {
                wrongPassword: false,
                userFound: true,
                failedConfirmation: false,
                userExists: userExists
            });
        });
    }else{
        res.render('accueil.ejs', {
            wrongPassword: false,
            userFound: true,
            failedConfirmation: true,
            userExists: false
        });
    }
};

//Chargement de l'utilisateur dans sa session
module.exports.loader = (req, res) => {
    var userFound = false;
    var wrongPassword = true;

    dao.UserDAO.findUserByEmailAndPassword(req.body.username)
    .then(user => {
        console.log('Chargement de l\'utilisateur');
        if(user != null) {
            userFound = true
            if(req.body.password === user.password) {
                wrongPassword = false;
                req.session.userId = user.userId.toString();
                req.session.username = user.eMail.toString();
                console.log('Chargement du contenu');
                return loadTaskLists(req, res);
            } else {
                res.render('accueil.ejs', {
                    userFound: userFound,
                    wrongPassword: wrongPassword
                })
            }
        } else {
            res.render('accueil.ejs', {
                userFound: userFound,
                wrongPassword: !wrongPassword
            });
        }
    })
    .catch(err => {
        console.log(err);
        if(userFound)
            return res.render('accueil.ejs', {
                wrongPassword: true,
                userFound: userFound
            });
        else
            return res.render('accueil.ejs', {
                wrongPassword: false,
                userFound: userFound
            });
    });
};

module.exports.loadTasks = (req, res) => {
    return loadTaskLists(req, res);
}

//Permet l'ajout d'une tâche en base
//puis redirection vers rechargement des taches
module.exports.ajouterTache = (req, res) => {
    if(req.session.username === '') {
        res.render('accueil.ejs', {
            wrongPassword: ''
        })
    } else {
        dao.TaskDAO.createTask(
            req.body.task.toString(),
            req.body.listeId.toString()
        )
        .then(() => {
            res.redirect('/');
        });
    }
};

module.exports.supprimerTache = (req, res) => {
    if(req.session.username === '')
        res.render('accueil.ejs', {
            wrongPassword: '',
            userFound: ''
        })
    else {
        var taskIdToDelete = querystring.parse(url.parse(req.url).query).id;
        
        dao.TaskDAO.deleteTaskById(taskIdToDelete)
        .then(() => {
            return loadTaskLists(req, res);
        });
    }
};

module.exports.deconnexion = (req, res) => {
    req.session.userId = '';
    req.session.username = '';
    res.render('accueil.ejs', {
        wrongPassword: '',
        userFound: ''
    })
};

module.exports.createList = (req, res) => {
    dao.TaskListDAO.createTaskList(req.body.taskListName.toString(), req.session.userId.toString())
    .then(() => {
        res.redirect('/');
    });
};

loadTaskLists = (req, res) => {
    //Charger les listes de l'utilisateur
    dao.TaskListDAO.findAllListsByUserId(req.session.userId)
    .then(lists => {
        //Listes chargées, on charge les taches de chaque liste
        var i = 0;

        if (lists.length != 0) {
            var tasks = Promise.all(lists.map(getTasks))
            .then(data => {
                console.log('Récupération des tâches terminées');
                return data;
            });

            return tasks.then(taches => {
                taches.forEach(liste => {
                    if(liste.length > 0) {
                        liste.unshift(
                            {
                                taskListName: lists[i].dataValues.taskListName,
                                taskListId: lists[i].dataValues.taskListId
                        });
                    } else {
                        liste.push(
                            {
                                taskListName: lists[i].dataValues.taskListName,
                                taskListId: lists[i].dataValues.taskListId
                        });
                    }
                    i++;
                })
                return taches;
            })
            .then(taches => {
                res.render('todoPage.ejs', {
                    username: req.session.username,
                    taches: taches
                })
            });
        } else {
            return res.render('todoPage.ejs', {
                username: req.session.username,
                taches: []
            });
        }
    })
};

getTasks = (list) => {
    console.log('Recherche des tâches');

    return new Promise((resolve, reject) => {
        resolve(dao.TaskDAO.findTasksByListId(list.dataValues.taskListId));
    });
};

checkIfUserExists = (eMail) => {
    return dao.UserDAO.findUserByEmail(eMail);
};