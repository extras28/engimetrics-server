import { Op } from 'sequelize';
import Tool from '../models/tool.model';
import { responseResult } from '../shared/constant/constant';

export async function getListTool(req, res, next) {
    try {
        const { q } = req.query;

        const tools = await Tool.findAll({
            where: { name: { [Op.like]: `%${q}%` } },
        });

        res.send({ result: responseResult.SUCCESS, tools });
    } catch (error) {
        next(error);
    }
}
