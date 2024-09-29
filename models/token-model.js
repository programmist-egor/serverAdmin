import { DataTypes } from 'sequelize';
import {sequelizeExtranet} from '../config/db-connect.js';
import User from "./user-model.js";


const TokenModel = sequelizeExtranet.define('TokenModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

TokenModel.belongsTo(User, { foreignKey: 'id' });

export default TokenModel;