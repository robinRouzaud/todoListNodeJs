/*
Classe utilisée afin de tester l'ajout de données en base
*/
var models = require('./modeles');

var User = models.UserModel;

var TaskList = models.TaskListModel;

var Task = models.TaskModel;

var User1 = User.build({prenom: 'Utilisateur 31', nom: 'Un nom 31', eMail: 'prenom.nom31@email.com', password: 'password31'});

User1.save()
    .then(() => {
        console.log('Utilisateur enregistré.');
        var TaskList1 = TaskList.build({taskListName: 'liste31', userId: User1.get('userId')});
        TaskList1.save().then(() => {
            console.log('Liste enregistrée.');
            var Task1 = Task.build({taskName: 'tache31', taskListId: TaskList1.get('taskListId')});
            Task1.save().then(() => {
                console.log('Tâche 31 enregistrée.');
                var Task2 = Task.build({taskName: 'tache32', taskListId: TaskList1.get('taskListId')});
                Task2.save().then(() => {
                    console.log('Tâche 32 enregistrée.');
                });
            });
        });
    });

/*
var TaskList1 = TaskList.build({taskListName: 'liste2', userId: User1.get('userId')});

TaskList1.save()
    .then(console.log('Liste enregistré.'));
*/