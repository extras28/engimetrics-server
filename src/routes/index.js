import { Router } from 'express';
import projectRouter from './project.routes.js';
import toolRouter from './tool.routes.js';

const apiRouter = Router();

apiRouter.use(projectRouter);
apiRouter.use(toolRouter);

export default apiRouter;
