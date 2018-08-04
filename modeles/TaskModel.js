module.exports = (sequelize, DataTypes) => {
    return sequelize.define('task', {
        taskId: {
            type: DataTypes.UUIDV1,
            defaultValue: DataTypes.UUIDV1,
            autoIncrement: true,
            primaryKey: true,
            field: 'tache_id',
            get() {
                return this.getDataValue('taskListId');
            }
        },
        taskName: {
            type: DataTypes.STRING,
            field: 'tache_nom',
            get() {
                return this.getDataValue('taskName');
            },
            set(name) {
                this.setDataValue('taskName', name);
            }
        },
        taskListId: {
            type: DataTypes.UUIDV1,
            referneces: 'liste',
            referenceKey: 'liste_id',
            field: 'liste_id',
            get () {
                return this.getDataValue('taskListId');
            },
            set(val) {
                this.setDataValue('taskListId', val);
            }
        }
    }, {
        tableName: 'tache',
        timestamps: false
    });
};