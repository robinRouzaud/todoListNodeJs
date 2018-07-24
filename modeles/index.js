/*
Model index file
ListEnh branch
*/

var Sequelize = require('sequelize');
var config = require('../../config/default').database;

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
    //Sinon Sequelize ajoute une colonne dans la sélection
    m.UserModel.hasOne(m.TaskListModel, {foreignKey: 'user_id'}); 
    m.TaskListModel.hasMany(m.TaskModel, {foreignKey: 'liste_id'});
})(module.exports);

module.exports.sequelize = sequelize;
