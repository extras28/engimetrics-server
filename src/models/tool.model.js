import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.config';

const Tool = sequelize.define('tool', {
    toolId: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(128),
});

export default Tool;
