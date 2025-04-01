import { Router } from 'express';
import projectRouter from './project.routes';

const apiRouter = Router();

apiRouter.use(projectRouter);

export default apiRouter;
