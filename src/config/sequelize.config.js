import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    dialect: process.env.DB_DIALECT,
    pool: {
        min: parseInt(process.env.DB_POOL_MIN),
        max: parseInt(process.env.DB_POOL_MAX),
        acquire: parseInt(process.env.DB_POOL_ACQUIRE),
        idle: parseInt(process.env.DB_POOL_IDLE),
    },
    timezone: process.env.TIMEZONE,
    logging: false,
    ssl: false,

    dialectOptions: {
        allowPublicKeyRetrieval: true,
        collation: "utf8mb4_unicode_ci",
    },
});
