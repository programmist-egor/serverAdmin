import { DataTypes } from 'sequelize';
import { sequelizeExtranet} from '../config/db-connect.js';


const SettingAccount = sequelizeExtranet.define('Setting-Account', {
    idTable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    accountsUser: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    chooseAccount: {
        type: DataTypes.JSON,
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