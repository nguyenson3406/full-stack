import db from '../models/index';

let getAllSchedule = (ScheduleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Schedules = ''
            if (!ScheduleId) {
                Schedules = await db.User.findAll({
                    attributes: ['id', 'firstName', 'lastName'],
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] }
                    ],
                    where: { roleId: 'R3' }
                });
            } else {
                Schedules = await db.Schedule.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    where: { doctorId: ScheduleId },
                });
            }
            resolve(Schedules);
        } catch (e) {
            reject(e);
        }
    })
}

let bulkSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataCreate = {}
            let schedule = data
            if (schedule && schedule.length > 0) {
                schedule = schedule.map((item) => {
                    item.maxNumber = 4
                    return item
                })
            }
            let isExist = await foundUser(schedule[0].doctorId)
            if (isExist) {
                await db.Schedule.destroy({
                    where: { doctorId: schedule[0].doctorId }
                })
                await db.Schedule.bulkCreate(schedule)
                dataCreate.message = `OK!`
                dataCreate.errCode = 0
            } else {
                dataCreate.message = `doctor isn't exist`
                dataCreate.errCode = 1
            }
            resolve(dataCreate)
        } catch (e) {
            reject(e)
        }
    })
}

let foundUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllSchedule: getAllSchedule,
    bulkSchedule: bulkSchedule,
}