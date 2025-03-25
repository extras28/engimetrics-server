import { Router } from "express";
import * as testController from "../controllers/gitlab.controller.js";

export const testRouter = Router();

testRouter.get("/test", testController.test);
