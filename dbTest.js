/*
Classe utilisée afin de tester l'ajout de données en base
*/
var models = require('./modeles');

var User = models.UserModel;

var TaskList = models.TaskListModel;

var User1 = User.build({prenom: 'Utilisateur 1', nom: 'Un nom', eMail: 'prenom.nom@email.com', password: 'password'});

User1.save()
    .then(
        console.log('Objet enregistré.')
    );