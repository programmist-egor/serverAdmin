import {sequelizeExtranet} from "../config/db-connect.js";
import {DataTypes} from "sequelize";

const InvoiceExtranet = sequelizeExtranet.define('Invoice-Extranet', {
    idTable: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hotelId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bank: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    provider: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    customer: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    invoiceNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    buyer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seller: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    services: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalAmountWords: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supervisor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default InvoiceExtranet;