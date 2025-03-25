import { Router } from "express";
import { testRouter } from "./test.router.js";

const apiRouter = Router();

apiRouter.use(testRouter);

export default apiRouter;
