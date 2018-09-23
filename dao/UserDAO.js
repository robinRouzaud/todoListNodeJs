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
module.exports.getUserByEmailAndPassword = (email, password) => {
    return User.findOne({
        where: {
            email: email,
            password: password
        }
    });
};
 
//Update
module.exports.updateUserFirstName = (User, firstName) => {
    User.update({
        firstName: firstName
    });
};

//Delete


