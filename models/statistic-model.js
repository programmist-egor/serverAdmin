import { DataTypes } from 'sequelize';
import {sequelizeExtranet} from '../config/db-connect.js';


const Statistic = sequelizeExtranet.define('Statistic', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    statsId: {
        type: DataTypes.STRING,
    },
    statisticData: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

export default Statistic;