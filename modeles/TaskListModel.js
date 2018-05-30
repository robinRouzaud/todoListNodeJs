var Sequelize = require('sequelize')
var sequelize = require('../dbConnection/dbCon');
var User      = require('./UserModel');

const TaskList = sequelize.define('task_list', {
    taskListId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'task_list_id',
        get() {
            return this.getDataValue('taskListId');
        }
    },
    taskListName: {
        type: Sequelize.STRING,
        field: 'task_list_name',
        get() {
            return this.getDataValue('taskListName');
        },
        set(name) {
            this.setDataValue('taskListName', name);
        }
    },
    taskListOwnerFK: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'userId',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        field: 'list_user_id',
        get() {
            return this.getDataValue('taskListOwnerFK')
        }
    }
});