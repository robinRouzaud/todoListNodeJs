var models = require('./modeles');

var DAOs = ['UserDAO',
    'TaskListDAO'
];

DAOs.forEach(function(dao) {
    module.exports[dao] = require('./' + dao);
})