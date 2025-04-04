import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import * as database from './models/index.js';
import { sequelize } from './config/sequelize.config.js';
import { errorHandlerMiddleware } from './middlewares/error_handler.middleware.js';
import apiRouter from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function start() {
    const PORT = process.env.PORT ?? 3001;
    // connect to database
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        // await database.sync({ force: true });
        await sequelize.sync({ alter: true });
        // await sequelize.sync();
        // await database.drop();
        console.log('All models are sync.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }

    const app = express().disable('x-powered-by');

    app.use(cors());
    app.use(express.json({ limit: '128mb' }));
    app.use(express.urlencoded({ extended: true, limit: '128mb' }));

    // Router
    app.use('/api/v1', apiRouter);

    // Serve static files from the "static" directory
    app.use(express.static(path.join(__dirname, '../static'))); // Adjusted path

    // Catch-all route to serve index.html for all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../static', 'index.html')); // Adjusted path
    });

    // Error handler
    app.use(errorHandlerMiddleware);

    app.listen(PORT, () => {
        console.log(`EngiMetrics server is running on port ${PORT}.`);
    });
}

start();
