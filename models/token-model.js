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
        validate: {
            len: [1, 1000] // Ограничение от 1 до 255 символов
        }
    },

});

TokenModel.belongsTo(User, { foreignKey: 'userId' });

export default TokenModel;