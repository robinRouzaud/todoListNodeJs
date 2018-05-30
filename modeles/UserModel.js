var Sequelize = require('sequelize')
var sequelize = require('../dbConnection/dbCon');

const User = sequelize.define('user', {
    userId:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id',
        get() {
            return this.getDataValue('userId');
        }
    },
    prenom: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('prenom');
        },
        set(val) {
            this.setDataValue('prenom', val.toString());
        }
    },
    nom: {
        type: Sequelize.STRING,
        get() {
            return this.getDataValue('nom');
        },
        set(val) {
            this.setDataValue('nom', val.toString());
        }
    },
    eMail: {
        type: Sequelize.STRING,
        validate: {isEmail: true},
        allowNull: false,
        get() {
            return this.getDataValue('eMail');
        },
        set(val) {
            this.setDataValue('eMail', val.toString);
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('password', val);
        }
    }
});
