const Sequelize = require('sequelize');

const sequelize = new Sequelize('todo_list_tp', 'postgres', 'RbnRzd111091', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

exports.sequelize = sequelize;