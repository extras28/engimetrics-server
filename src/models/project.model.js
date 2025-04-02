import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.config.js';

const Project = sequelize.define(
    'project',
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, primaryKey: true },
        name: DataTypes.STRING(256),
        name_with_namespace: DataTypes.STRING(256),
        created_at: DataTypes.DATE,
        http_url_to_repo: DataTypes.STRING(256),
        avatar_url: DataTypes.STRING(256),
        description: DataTypes.TEXT,
    },
    { timestamps: false }
);

export default Project;
