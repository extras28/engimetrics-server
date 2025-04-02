import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import simpleGit from 'simple-git';
import { fileURLToPath } from 'url';
import Project from '../models/project.model.js';
import { responseResult } from '../shared/constant/constant.js';
import { ERROR_PROJECT_NOT_EXISTED } from '../shared/errors/error.js';
import { isValidNumber } from '../shared/utils/utils.js';
import { exec } from 'child_process';
import axios from 'axios';
import { sonarScanner } from '../code-quality-tools/sonar/sonarScanner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        const { id } = req.params;

        if (!id) {
            throw new Error('Project ID is required.');
        }

        const project = await Project.findByPk(id);
        if (!project || !project.http_url_to_repo) {
            throw new Error(ERROR_PROJECT_NOT_EXISTED);
        }

        const repoUrl = project.http_url_to_repo;
        const tempDir = path.join(__dirname, '../../temp_repos');
        const repoName = path.basename(repoUrl, '.git');
        const repoPath = path.join(tempDir, repoName);

        const authRepoUrl = repoUrl.replace(
            'http://',
            `http://oauth2:${process.env.GITLAB_TOKEN}@`
        );

        // Xóa repo cũ nếu tồn tại trước khi clone
        await fs.rm(repoPath, { recursive: true, force: true });

        await simpleGit().clone(authRepoUrl, repoPath);

        const analytics = await sonarScanner(project, repoPath);
        // Xóa repo sau khi hoàn tất
        await fs.rm(repoPath, { recursive: true, force: true });

        res.send({
            result: responseResult.SUCCESS,
            issues: analytics,
        });
    } catch (error) {
        next(error);
    }
}
