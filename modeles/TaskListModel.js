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
            type: DataTypes.INTEGER,
            references: 'utilisateur',
            referencesKey: 'user_id',
            field: 'user_id'
        }
    }, {
        tableName: 'liste',
        timestamps: false
    });
};