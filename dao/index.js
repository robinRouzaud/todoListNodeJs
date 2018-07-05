/*
DAO index file
*/

var DAOs = [
    'UserDAO',
    'TaskListDAO',
    'TaskDAO'
];

DAOs.forEach(function(dao) {
    module.exports[dao] = require('./' + dao);
});