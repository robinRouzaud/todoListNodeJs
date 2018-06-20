/*
DAO index file
*/

//var modelIndex = require('../modeles');

var DAOs = ['UserDAO',
    'TaskListDAO',
    'TaskDAO'
];

DAOs.forEach(function(dao) {
    module.exports[dao] = require('./' + dao);
});