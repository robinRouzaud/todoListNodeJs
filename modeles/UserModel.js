module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        userId:{
            // L'ID est géré par Sequelize:
            type: DataTypes.UUIDV1,   //-> En base, le type d'user_id est VARCHAR(X)
            defaultValue: DataTypes.UUIDV1,
            //L'id est géré par le sgbd:
            //type: DataTypes.INTEGER, // -> En base le type est SERIAL (postgresql)
            //autoIncrement: true,
            primaryKey: true,
            field: 'user_id',
            get() {
                return this.getDataValue('userId');
            },
            set(val) {
                if (val)
                this.setDataValue('userId', val);
            }
        },
        prenom: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('prenom');
            },
            set(val) {
                this.setDataValue('prenom', val.toString());
            }
        },
        nom: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('nom');
            },
            set(val) {
                this.setDataValue('nom', val.toString());
            }
        },
        eMail: {
            type: DataTypes.STRING,
            validate: {isEmail: true},
            allowNull: false,
            field: 'email',
            get() {
                return this.getDataValue('eMail');
            },
            set(val) {
                this.setDataValue('eMail', val.toString());
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue('password', val);
            }
        }
    }, {
        tableName: 'utilisateur',
        timestamps: false
    });
};