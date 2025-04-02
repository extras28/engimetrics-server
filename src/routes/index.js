import { Router } from 'express';
import projectRouter from './project.routes.js';

const apiRouter = Router();

apiRouter.use(projectRouter);

export default apiRouter;
