import { Op } from 'sequelize';
import gitlabService from '../service/gitlab';
import { responseResult } from '../shared/constant/constant';
import { isValidNumber } from '../shared/utils/utils';
import Project from '../models/project.model';

export async function getListProject(req, res, next) {
    try {
        let { limit, page, user, q } = req.query;

        q = q ?? '';

        const conditions = {
            [Op.or]: [{ name: { [Op.like]: `%${q}%` } }],
        };

        let projects = [];

        if (!isValidNumber(limit) || !isValidNumber(page)) {
            projects = await Project.findAndCountAll({
                where: conditions,
                order: [['id', 'DESC']],
            });
        } else {
            limit = Number(limit);
            page = Number(page);

            projects = await Project.findAndCountAll({
                where: conditions,
                order: [['id', 'DESC']],
                limit,
                offset: limit * page,
            });
        }

        res.send({ result: responseResult.SUCCESS, projects });
    } catch (error) {
        next(error);
    }
}

export async function codeReviewController(req, res, next) {
    try {
        const { id } = req.query;
        const project = await Project.findByPk(id);

        const gitUrl = project.http_url_to_repo;

        res.send({ result: responseResult.SUCCESS, project });
    } catch (error) {
        next(error);
    }
}
