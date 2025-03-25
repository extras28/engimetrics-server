import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { errorHandlerMiddleware } from "./middlewares/error_handler.middleware.js";
import apiRouter from "./routes/index.js";

async function start() {
    const PORT = process.env.PORT ?? 3001;

    const app = express().disable("x-powered-by");

    app.use(cors());
    app.use(express.json({ limit: "128mb" }));
    app.use(express.urlencoded({ extended: true, limit: "128mb" }));

    // Router
    app.use("/api/v1", apiRouter);

    // Error handler
    app.use(errorHandlerMiddleware);

    app.listen(PORT, () => {
        console.log(`EngiMetrics server is running on port ${PORT}.`);
    });
}

start();
