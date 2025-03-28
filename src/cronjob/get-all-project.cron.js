import moment from 'moment';
import cron from 'node-cron';
import gitlabService from '../service/gitlab';
import Project from '../models/project.model';

const TAG = '[CRON.updateProjects]';

export async function updateProjects() {
    cron.schedule('0 0 1 * *', async () => {
        const transaction = await Project.sequelize.transaction();
        try {
            let projects = [];
            const firstResponse = await gitlabService.projects.list({ per_page: 100, page: 1 });

            projects = projects.concat(firstResponse.data);
            const total = parseInt(firstResponse.headers['x-total'], 10);
            const totalPages = Math.ceil(total / 100);

            if (totalPages > 1) {
                const requests = [];
                for (let count = 2; count <= totalPages; count++) {
                    requests.push(gitlabService.projects.list({ per_page: 100, page: count }));
                }

                const responses = await Promise.all(requests);
                responses.forEach((res) => {
                    projects = projects.concat(res.data);
                });
            }

            // Lấy danh sách ID của các project đã tồn tại trong database
            const existingProjects = await Project.findAll({
                attributes: ['id'],
                where: {
                    id: projects.map((p) => p.id),
                },
                transaction,
            });

            const existingProjectIds = new Set(existingProjects.map((p) => p.id));

            // Tách project thành 2 nhóm: Cần tạo mới và cần cập nhật
            const newProjects = projects.filter((p) => !existingProjectIds.has(p.id));
            const updateProjects = projects.filter((p) => existingProjectIds.has(p.id));

            // Chèn mới các project chưa tồn tại
            if (newProjects.length > 0) {
                await Project.bulkCreate(newProjects, { transaction });
            }

            // Cập nhật thông tin các project đã có
            for (const proj of updateProjects) {
                await Project.update(proj, { where: { id: proj.id }, transaction });
            }

            await transaction.commit();
            console.log(
                TAG,
                `${moment().format('DD/MM/YYYY HH:mm')} - Update projects successful. New: ${
                    newProjects.length
                }, Updated: ${updateProjects.length}\n`
            );
        } catch (error) {
            await transaction.rollback();
            console.error(
                TAG,
                `${moment().format('DD/MM/YYYY HH:mm')} - Error while updating projects: ${
                    error.message
                } \n`
            );
        }
    });
}
