import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';

const projectRouter = Router();

projectRouter.get('/project/list', projectController.getListProject);
projectRouter.get('/project/detail/;id', projectController.getProjectDetail);
projectRouter.get('/project/check/:id', projectController.codeReviewController);
projectRouter.get('/project/language/:id', projectController.getProjectLanguage);

export default projectRouter;
