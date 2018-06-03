var Sequelize = require('sequelize');
var config = require('../../config/default').database;

var sequelize = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
);

var models = ['UserModel',
            'TaskListModel'];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
    m.UserModel.hasOne(m.TaskListModel);
})(module.exports);

module.exports.sequelize = sequelize;
