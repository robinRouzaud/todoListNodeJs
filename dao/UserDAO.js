//User DAO file


const User = require('../models').User

//Create
export function createUser(firstName, lastName, email, password){
    return User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });
};

//Read
export function findUserByEmailAndPassword(email, password){
    return User.findOne({
        where: {
            email: email,
            password: password
        }
    });
};

export function findUserById(Id){
    return User.findOne({
        where: {
            id: Id
        }
    });
};

//Update
export function updateUserFirstName(UserInstance, firstName){
    return UserInstance.update({
        firstName: firstName
    });
};

export function updateUserLastName(UserInstance, lastName){
    return UserInstance.update({
        lastName: lastName
    });
};

export function updateUserEmail(UserInstance, email){
    return UserInstance.update({
        email: email
    });
};

export function updateUserPassword(UserInstance, password){
    return UserInstance.update({
        password: password
    });
};

//Delete
export function deleteUserById(Id){
    this.findUserById(Id)
    .then(user => {
        user.destroy();
    })
    .then(console.log("Utilisateur supprimé"));
};

