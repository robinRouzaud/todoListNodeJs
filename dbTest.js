/*
Classe utilisée afin de tester l'ajout de données en base
et la récupération des données associées à l'objets
Illustration sur l'utilisation des Promises et de la nécessité d'utiliser ".then()"
*/

//var dao = require('./dao');

var User = require('./models').User;
var TodoList = require('./models').TodoList;
var Task = require('./models').Task;

/*
var user1 = dao.UserDAO.createUser('prenomDAO9', 'nomDAO9', 'emailDAO9@test.com', 'passwordDAO9')
                .then(function(user) {
                    console.log('User.userId: \n' + user.userId);
                });
*/

//console.log('Essai 1: \n' + user1);

//console.log('Essai 2: \n' + dao.UserDAO.createUser('prenomDAO10', 'nomDAO10', 'emailDAO10@test.com', 'passwordDAO10'));

/*
dao.UserDAO.createUser('PrenomDAO10', 'nomDAO10','emailDAO10@test.com', 'passwordDAO10')
    .then(
        (user) => {
            dao.TaskListDAO.createTaskList('TaskList_1_DAOu10', user.userId)
                .then(
                    (taskList) => {
                        dao.TaskDAO.createTask('Task1u10L1', taskList.taskListId);
                        dao.TaskDAO.createTask('Task2u10L1', taskList.taskListId);
                        dao.TaskDAO.createTask('Task3u10L1', taskList.taskListId);
                        dao.TaskDAO.createTask('Task4u10L1', taskList.taskListId);
                    }
                );

                dao.TaskListDAO.createTaskList('TaskList_2_DAOu10', user.userId)
                .then(
                    (taskList) => {
                        dao.TaskDAO.createTask('Task1u10L2', taskList.taskListId);
                        dao.TaskDAO.createTask('Task2u10L2', taskList.taskListId);
                        dao.TaskDAO.createTask('Task3u10L2', taskList.taskListId);
                        dao.TaskDAO.createTask('Task4u10L2', taskList.taskListId);
                    }
                );

        }
    );
*/

/*
dao.TaskListDAO.findAllListsByUserId("b7471990-9271-11e8-9374-398f2067eada")
.then((lists) => {

    var i = 0;
    var tasks = Promise.all(lists.map(getTasks))
    .then((data) => {
        console.log('Recherche terminée');
        console.log(data);
        return data;
    });

    tasks.then(taches => {
        console.log("Undefined? " + taches);
        taches.forEach(liste => {
            liste.unshift(
                {
                    taskListName: lists[i].dataValues.taskListName,
                    taskListId: lists[i].dataValues.taskListId
                });
            i++;
        })
        console.log(taches);
    });
})

getTasks = (list) => {
    console.log('Recherche des tâches');
    return new Promise((resolve, reject) => {
        resolve(dao.TaskDAO.findTasksByListId(list.dataValues.taskListId));
    });
}
*/
/*
dao.UserDAO.findUserByEmail("emailDAO101@test.com")
    .then(user => {
        console.log(user);
    });
*/


//dao.TaskListDAO.createTaskList('essai dbTest', 'ead50a80-ac7d-11e8-8ff9-a95ec1f48af4');

/*
dao.TaskDAO.createTask('Tache1');
dao.TaskDAO.createTask('Tache2').then(task => {
    console.log(task);
});
*/


User.create({
    firstName: "Alex",
    lastName: "Misovic",
    email: "",
    password: "poutchi"
}).then(user => {
    user.createTodoList({
        name: "Ma première liste"
    }).then(list => {
        list.createTask({
            name: "Jouer à mon iPad.",
            quantity: 1
        });
        list.createTask({
            name: "Regarder le shopping",
            quantity: 9999
        });
        list.createTask({
            name: "Caresser Greschka",
            quantity: 999999999
        });
    });
    user.createTodoList({
        name: "J'adore les listes"
    }).then(list => {
        list.createTask({
            name: "Jouer à mon iPad. Encore.",
            quantity: 1
        });
        list.createTask({
            name: "Faire une liste de shopping",
            quantity: 9999
        });
        list.createTask({
            name: "Caresser Greschka",
            quantity: 999999999
        });
    });
}).then(
    console.log("Tout est enregistré!")
);