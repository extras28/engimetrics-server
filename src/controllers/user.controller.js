import gitlabService from '../service/gitlab';
import { responseResult } from '../shared/constant/constant';

export async function getAllUser(req, res, next) {
    try {
        const projects = await gitlabService.projects.list({
            per_page: process.env.GITLAB_PROJECTS_LIMIT,
        });

        const commits = await Promise.all(
            projects.data.flat().map(async (project) => {
                const commitInProject = await gitlabService.commits.list({ projectId: project.id });
                project.user = commitInProject.data.map((commit) => ({
                    username: commit.author_name,
                    email: commit.author_email,
                }));

                return commitInProject;
            })
        );

        const users = commits.map((commit) => ({ removeD }));

        res.send({ result: responseResult.SUCCESS, projects });
    } catch (error) {
        next(error);
    }
}
