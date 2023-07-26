import db from '../models/index';
import { Op } from 'sequelize';

let getAllcode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ''
            if (!type) {
                data = await db.Allcode.findAll({
                    attributes: ['key', 'value_en', 'value_vi'],
                    where: { type: { [Op.ne]: "ROLE" } }
                })
            } else {
                data = await db.Allcode.findAll({
                    attributes: ['key', 'value_en', 'value_vi'],
                    where: { type: type }
                })
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctor = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (!userId) {
                users = await db.User.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Markdown, attributes: ['contentMarkdown', 'description'] },
                        { model: db.Doctor_Infor, attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] } },
                        { model: db.Schedule, attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] } },
                    ],
                    where: { roleId: 'R3' }
                });
            } else {
                users = await db.User.findOne({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Markdown, attributes: ['contentMarkdown', 'description'] },
                        { model: db.Doctor_Infor, attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] } },
                        { model: db.Schedule, attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt'] } },
                    ],
                    where: { id: userId },
                });
                if (users.image) {
                    users.image = new Buffer.from(users.image, 'base64').toString('binary')
                }
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllcode: getAllcode,
    getDoctor: getDoctor
}