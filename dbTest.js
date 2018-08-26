/*
Classe utilisée afin de tester l'ajout de données en base
et la récupération des données associées à l'objets
Illustration sur l'utilisation des Promises et de la nécessité d'utiliser ".then()"
*/

var dao = require('./dao');

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
                {taskListName: lists[i].dataValues.taskListName,
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

/*
dao.UserDAO.findUserByEmail("emailDAO101@test.com")
    .then(user => {
        console.log(user);
    });
*/
