import { Op } from 'sequelize';
import Tool from '../models/tool.model';
import { responseResult } from '../shared/constant/constant';
import { ERROR_TOOL_NOT_EXITED } from '../shared/errors/error';

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

export async function createTool(req, res, next) {
    try {
        const { name } = req.body;

        await Tool.create({ name });

        res.send({ result: responseResult.SUCCESS });
    } catch (error) {
        next(error);
    }
}

export async function updateTool(req, res, next) {
    try {
        const { id, name } = req.body;

        const tool = await Tool.findByPk(id);

        if (!tool) throw new Error(ERROR_TOOL_NOT_EXITED);

        await tool.update({ name });

        res.send({ result: responseResult.SUCCESS });
    } catch (error) {
        next(error);
    }
}
