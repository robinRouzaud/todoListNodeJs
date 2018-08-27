/*
Model index file
ListEnh branch
*/

var Sequelize = require('sequelize');
var config = require('../../config/default_lenh').database;

var sequelize = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
);

var models = ['UserModel',
            'TaskListModel',
            'TaskModel'
        ];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
    //Nécessaire d'ajouter les foreign keys à ce niveau
    //Sinon Sequelize ajoute une colonne dans les champs retournés
    //par le SELECT
    m.UserModel.hasMany(m.TaskListModel, {foreignKey: 'userId'}); 
    m.TaskListModel.hasMany(m.TaskModel, {foreignKey: 'taskListId'});
})(module.exports);

module.exports.sequelize = sequelize;
