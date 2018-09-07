/*
TaskList model definition file
*/

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('task_list', {
        taskListId: {
            type: DataTypes.UUIDV1,
            defaultValue: DataTypes.UUIDV1,
            autoIncrement: true,
            primaryKey: true,
            field: 'liste_id',
            get() {
                return this.getDataValue('taskListId');
            }
        },
        taskListName: {
            type: DataTypes.STRING,
            field: 'liste_nom',
            get() {
                return this.getDataValue('taskListName');
            },
            set(name) {
                this.setDataValue('taskListName', name);
            }
        },
        userId: {
            type: DataTypes.UUIDV1,
            references: {
                model: 'UserModel',
                key: 'user_id',
            },
            field: 'user_id',
            get () {
                return this.getDataValue('userId');
            },
            set(val) {
                this.setDataValue('userId', val);
            }
        }
    }, {
        tableName: 'liste',
        timestamps: false
    });
};