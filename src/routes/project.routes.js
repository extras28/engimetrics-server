import { Router } from 'express';
import * as projectController from '../controllers/project.controller';

const projectRouter = Router();

projectRouter.get('/project/list', projectController.getListProject);
projectRouter.get('/project/detail/;id', projectController.getProjectDetail);
projectRouter.get('/project/check/:id', projectController.codeReviewController);

export default projectRouter;
