import { Op } from 'sequelize';
import Tool from '../models/tool.model.js';
import { responseResult } from '../shared/constant/constant.js';
import { ERROR_TOOL_NOT_EXITED } from '../shared/errors/error.js';

export async function getListTool(req, res, next) {
    try {
        let { q } = req.query;

        q = q ?? '';

        const tools = await Tool.findAll({
            where: { [Op.or]: { name: { [Op.like]: `%${q}%` } } },
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
