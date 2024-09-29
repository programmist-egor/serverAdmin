import {DataTypes} from 'sequelize';
import {sequelizeExtranet} from '../config/db-connect.js';


const SettingAccount = sequelizeExtranet.define('Setting-Account', {
    idTable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sealImage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    signatureImage: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    chooseAccount: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    date: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    countDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default SettingAccount;