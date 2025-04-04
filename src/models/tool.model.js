import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.config.js';

const Tool = sequelize.define('tool', {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(128),
});

export default Tool;
