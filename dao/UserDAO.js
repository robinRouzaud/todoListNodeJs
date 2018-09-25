//User DAO file
const User = require('../models').User

//Create
module.exports.createUser = (firstName, lastName, email, password) => {
    return User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });
};

//Read
module.exports.findUserByEmailAndPassword = (email, password) => {
    return User.findOne({
        where: {
            email: email,
            password: password
        }
    });
};

module.exports.findUserById = (Id) => {
    return User.findOne({
        where: {
            id: Id
        }
    });
};
 
//Update
module.exports.updateUserFirstName = (UserInstance, firstName) => {
    return UserInstance.update({
        firstName: firstName
    });
};

//Delete
module.exports.deleteUserById = (Id) => {
    this.findUserById(Id)
    .then(user => {
        user.destroy();
    })
    .then(console.log("Utilisateur supprimé"));
};

