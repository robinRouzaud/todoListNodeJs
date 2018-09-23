'use strict';

var DAOs = [
    'UserDAO'
];

DAOs.forEach(function(dao) {
    module.exports[dao] = require('./' + dao);
});