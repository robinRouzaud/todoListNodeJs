/*
Classe utilisée afin de tester l'ajout de données en base
*/
var models = require('./modeles');

var User = models.UserModel;

var TaskList = models.TaskListModel;

var User1 = User.build({prenom: 'Utilisateur 1', nom: 'Un nom 1', eMail: 'prenom.nom1@email.com', password: 'password1'});

User1.save()
    .then(() => {
        console.log('Utilisateur enregistré.');
        var TaskList1 = TaskList.build({taskListName: 'liste1', userId: User1.get('userId')});
        TaskList1.save().then(() => {
            console.log('Liste enregistrée.');
        })
    });

/*
var TaskList1 = TaskList.build({taskListName: 'liste2', userId: User1.get('userId')});

TaskList1.save()
    .then(console.log('Liste enregistré.'));
*/