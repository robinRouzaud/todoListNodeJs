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

const findUserById = (Id) => {
    return User.findOne({
        where: {
            id: Id
        }
    });
};

export default findUserById;
 
//Update
module.exports.updateUserFirstName = (UserInstance, firstName) => {
    return UserInstance.update({
        firstName: firstName
    });
};

module.exports.updateUserLastName = (UserInstance, lastName) => {
    return UserInstance.update({
        lastName: lastName
    });
};

module.exports.updateUserEmail = (UserInstance, email) => {
    return UserInstance.update({
        email: email
    });
};

module.exports.updateUserPassword = (UserInstance, password) => {
    return UserInstance.update({
        password: password
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

