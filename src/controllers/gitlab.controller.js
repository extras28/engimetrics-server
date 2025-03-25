import gitlabService from "../service/gitlab/index.js";
import { responseResult } from "../shared/constant/constant.js";

export async function test(req, res, next) {
    try {
        const response = await gitlabService.projects.projects();

        res.send({ result: responseResult.SUCCESS, response });
    } catch (error) {
        next(error);
    }
}
