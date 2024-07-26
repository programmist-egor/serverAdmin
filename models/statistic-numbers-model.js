import { DataTypes } from 'sequelize';
import {sequelizeExtranet} from '../config/db-connect.js';


const StatisticNumbers = sequelizeExtranet.define('Statistic-Numbers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nameNumbers: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    typeNumbers: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    countBooking: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default StatisticNumbers;