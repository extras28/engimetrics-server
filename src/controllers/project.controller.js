import { Op } from 'sequelize';
import gitlabService from '../service/gitlab';
import { responseResult } from '../shared/constant/constant';
import { isValidNumber } from '../shared/utils/utils';
import Project from '../models/project.model';
import simpleGit from 'simple-git';

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

export async function getProjectDetail(req, res, next) {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);

        if (!project) throw new Error(ERROR_PROJECT_NOT_EXISTED);

        res.send({ result: responseResult.SUCCESS, project });
    } catch (error) {
        next(error);
    }
}

export async function codeReviewController(req, res, next) {
    try {
        const { id } = req.query;
        const project = await Project.findByPk(id);

        const repoUrl = project.http_url_to_repo;

        const tempDir = path.join(__dirname, 'temp_repo');
        const repoName = path.basename(repoUrl, '.git');
        const repoPath = path.join(tempDir, repoName);

        // Clone repo
        await simpleGit().clone(repoUrl, repoPath);
        console.log(`Cloned repository: ${repoUrl}`);

        // // Log repo files
        // const files = await fs.readdir(repoPath);
        // console.log('Repository files:', files);

        // Remove only the cloned repo
        await fs.remove(repoPath);
        console.log('Repository removed successfully');

        res.send({ result: responseResult.SUCCESS, project });
    } catch (error) {
        next(error);
    }
}
