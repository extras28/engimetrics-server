import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config";

export const Account = sequelize.define(
    "account",
    {
        accountId: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true, autoIncrement: true },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        employeeCode: { type: DataTypes.STRING(10), unique: true },
        name: { type: DataTypes.STRING(100) },
        phone: {
            type: DataTypes.STRING(11),
            validate: {
                is: /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/,
            },
        },
        title: {
            type: DataTypes.STRING(256),
        },
        password: {
            type: DataTypes.STRING(256),
        },
        avatar: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
    }
);
