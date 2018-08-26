/*
Route handler file
*/
var dao = require('../dao');
var url = require('url');
var querystring = require('querystring');

//Initialisation de la session de l'utilisateur
module.exports.init = (req, res, next) => {

    if(req.session.userId === 'undefined')
        req.session.userId = '';
    if(req.session.username === 'undefined')
        req.session.username = '';

    next();
};

//Chargement de l'utilisateur dans sa session
module.exports.loader = (req, res) => {
    var userFound = false;

    dao.UserDAO.findUserByEmailAndPassword(req.body.username)

    .then(user => {
        console.log('Chargement de l\'utilisateur');
        if(req.body.password === user.password) {
            userFound = true;
            req.session.userId = user.userId.toString();
            req.session.username = user.eMail.toString();
            return true;
        } else {
            throw err;
        }
    })

    .then(userFound => {
        if(userFound) {
            console.log('Chargement du contenu');
            return loadTaskLists(req, res);
        } else {
            return [];
        }
    })

    .catch(err => {
        console.log(err);
        if(userFound)
            return res.render('accueil.ejs', {
                wrongPassword: true
            });
        else
            return res.render('accueil.ejs', {
                wrongPassword: false
            });
    });
};

//Permet l'ajout d'une tâche en base
//puis redirection vers rechargement des taches
module.exports.ajouterTache = (req, res) => {
    if(req.session.username === '')
        res.render('accueil.ejs', {
            wrongPassword: ''
        })
    else {
        dao.TaskDAO.createTask(req.body.task.toString(), req.body.listeId.toString())
        /*
        .then(() => {
            loadTaskLists(req, res);
        })
        */
        .then(() => {
            res.redirect('/');
        });
    }
};

module.exports.supprimerTache = (req, res) => {
    if(req.session.username === '')
        res.render('accueil.ejs', {
            wrongPassword: ''
        })
    else {
        var taskIdToDelete = querystring.parse(url.parse(req.url).query).id;
        
        dao.TaskDAO.deleteTaskById(taskIdToDelete)

        .then(() => {
            loader(req, res);
        })
    }
};

module.exports.deconnexion = (req, res) => {
    req.session.userId = '';
    req.session.username = '';
    res.render('accueil.ejs', {
        wrongPassword: ''
    })
}

loadTaskLists = (req, res) => {
    //Charger les listes de l'utilisateur
    dao.TaskListDAO.findAllListsByUserId(req.session.userId)

    .then(lists => {
        //Listes chargées, on charge les taches de chaque liste
        var i = 0;

        var tasks = Promise.all(lists.map(getTasks))
        .then(data => {
            console.log('Récupération des tâches terminées');
            return data;
        });

        return tasks.then(taches => {
            taches.forEach(liste => {
                liste.unshift(
                    {
                        taskListName: lists[i].dataValues.taskListName,
                        taskListId: lists[i].dataValues.taskListId
                    });
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
    })
}

getTasks = (list) => {
    console.log('Recherche des tâches')
    return new Promise((resolve, reject) => {
        resolve(dao.TaskDAO.findTasksByListId(list.dataValues.taskListId));
    });
}


/*
loadTaskLists utilise une fonction qui envoie le résultat des requêtes dans content
Une fois que les noms de listes sont chargés on récupère les taches.
On envoie les taches dans content
*/
