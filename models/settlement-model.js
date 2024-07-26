import { DataTypes } from 'sequelize';
import {sequelizeExtranet} from '../config/db-connect.js';


const Settlement = sequelizeExtranet.define('Settlement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idObject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    checked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    partnerAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    serviceAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Settlement;