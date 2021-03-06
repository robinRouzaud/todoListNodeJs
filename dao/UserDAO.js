/*
User DAO file
*/

var modelIndex = require('../modeles');

var UserModel = modelIndex.UserModel;

module.exports.builAndSaveUser = (prenom, nom, eMail, password) => {
    var newUser = UserModel.build({prenom: prenom,
                                    nom: nom,
                                    eMail: eMail,
                                    password: password});
    newUser.save()
        .then(() => {
            console.log('Utilisateur enregistré via couche DAO');
        })
        .then(function (newUser) {
            return newUser;
        });
};

module.exports.createUser = (prenom, nom, eMail, password) => {
    return UserModel.create({
        nom: nom,
        prenom: prenom,
        eMail: eMail,
        password: password
    })
};

module.exports.findUserByEmail = (eMail) => {
    return UserModel.findOne({
        where: {
            eMail: eMail
        }
    })
};

module.exports.findUserByEmailAndPassword = (eMail) => {
    return UserModel.findOne({
        where: {
            eMail: eMail
        }
    })
};