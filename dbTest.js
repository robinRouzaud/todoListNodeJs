/*
Classe utilisée afin de tester l'ajout de données en base
Illustration sur l'utilisation des Promises et de la nécessité d'utiliser ".then()"
*/

var dao = require('./dao');

var user1 = dao.UserDAO.createUser('prenomDAO9', 'nomDAO9', 'emailDAO9@test.com', 'passwordDAO9')
                .then(function(user) {
                    console.log('User.nom: \n' + user.nom);
                });

console.log('Essai 1: \n' + user1);

console.log('Essai 2: \n' + dao.UserDAO.createUser('prenomDAO10', 'nomDAO10', 'emailDAO10@test.com', 'passwordDAO10'));