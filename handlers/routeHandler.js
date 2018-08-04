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
        rq.session.username = '';

    next();
};

//Chargement de l'utilisateur dans sa session
module.exports.loader = (req, res) => {
    var userFound = false;

    dao.UserDAO.findUserByEmailAndPassword(req.body.username)

    .then(user => {
        
        if(req.body.password === user.password) {
            userFound = true;
            req.session.userId = user.userId.toString();
            req.session.username = user.eMail.toString();
        } else {
            throw err;
        }
    })

    .then(() => {
        loadTaskLists(req, res);
    })

    .catch(err => {
        if(userFound)
            return res.render('acceuil.ejs', {
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
    var content = {};

    dao.TaskListDAO.findAllListsByUserId(req.session.userId)

    .then(lists => {
        if(lists.length === 0) {
            return res.render('todoPage.ejs', {
                username: req.session.username,
                content: content
            });
        } else {
            var i = 0;
            console.log("----------------------");
            console.log("Chargement des listes.");
            console.log("----------------------");
            return lists.forEach(list => {
                i++;
                //nom de la liste
                var listNbString = "list" + i;

                //Objet liste initialisé
                content[listNbString] = {};

                //Identifiant de la liste
                //content[listNbString].listId = "";

                //Nom de la liste
                //content[listNbString].listName = "";

                //liste d'objets tâche
                content[listNbString].tasks = [];

                //Identifiant de la liste  
                content[listNbString].listId = list.taskListId.toString();

                content[listNbString].listName = list.taskListName.toString();

                dao.TaskDAO.findTasksByListId(list.taskListId.toString())

                .then(tasks => {
                    console.log("----------------------");
                    console.log("Chargement des tâches.");
                    console.log("----------------------");
                    tasks.forEach(task => {
                        console.log(task);
                        content[listNbString].tasks.push(task);
                    });
                })
                
            })

        }

    })

    .then(() => {
        console.log('Envoie de ' + content);
        return res.render('todoPage.ejs', {
            username: req.session.username,
            content: content
        });
    });
/*
    .then(() => {
        return res.render('todoPage.ejs', {
            username: req.session.username,
            content: content
        });
    });*/

}