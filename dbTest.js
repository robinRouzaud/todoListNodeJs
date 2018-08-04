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


/*
dao.UserDAO.findUserByEmail("emailDAO101@test.com")
    .then(user => {
        console.log(user);
    });
*/
