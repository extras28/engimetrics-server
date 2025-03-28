import gitlabService from '../service/gitlab';
import gitlabInstance from '../service/gitlab/instance';
import { responseResult } from '../shared/constant/constant';

export async function getListProject(req, res, next) {
    try {
        const { limit, page, user } = req.query;
        const response = await gitlabService.projects.list({
            per_page: limit,
            page,
        });

        res.rend({
            result: responseResult.SUCCESS,
            total: Number(response.headers['x-total']),
            projects: response.data,
        });
    } catch (error) {
        next(error);
    }
}

export async function codeReviewController(req, res, next) {
    try {
        const { projectId } = req.query;
        const response = await gitlabService.projects.projectById({ projectId });

        const project = response.data;

        res.send({ result: responseResult.SUCCESS, project });
    } catch (error) {
        next(error);
    }
}
