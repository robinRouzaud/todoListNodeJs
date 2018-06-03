module.exports = (sequelize, DataTypes) => {
    return sequelize.define('task_list', {
        taskListId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'task_list_id',
            get() {
                return this.getDataValue('taskListId');
            }
        },
        taskListName: {
            type: DataTypes.STRING,
            field: 'task_list_name',
            get() {
                return this.getDataValue('taskListName');
            },
            set(name) {
                this.setDataValue('taskListName', name);
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: 'user',
            referencesKey: 'user_id'
        }
    }, {
        tableName: 'task_list',
        timestamps: false
    });
};