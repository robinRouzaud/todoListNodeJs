/*
Model index file
ListEnh branch
*/

var Sequelize = require('sequelize');
var config = require('../../config/default_associations').database;

var sequelize = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
);

var models = [
    'UserModel',
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
    m.UserModel.hasMany(m.TaskListModel);
    m.TaskListModel.belongsTo(m.UserModel);
    m.TaskListModel.hasMany(m.TaskModel);
    m.TaskModel.belongsTo(m.TaskListModel);
})(module.exports);

sequelize.sync({force: true})
.then(() => {
    console.log('Synchro terminée');
});

module.exports.sequelize = sequelize;
