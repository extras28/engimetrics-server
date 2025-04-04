import { Router } from 'express';
import * as toolController from '../controllers/tool.controller.js';

const toolRouter = Router();

toolRouter.post('/tool/create', toolController.createTool);
toolRouter.get('/tool/list', toolController.getListTool);
toolRouter.put('/tool/update/:id', toolController.updateTool);

export default toolRouter;
