import db from '../models/index';
import emailServices from './emailServices'
import manageServices from './manageServices'

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

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let Doctor = ''
            Doctor = await db.User.findAll({
                attributes: ['id', 'firstName', 'lastName'],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] }
                ],
                where: { roleId: 'R3' }
            });
            resolve(Doctor);
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
            let isExist = await manageServices.foundUser(schedule[0].doctorId)
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

let getAllBooking = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = ''
            if (doctorId) {
                booking = await db.Booking.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'token'] },
                    include: [
                        { model: db.Allcode, as: 'statusData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Allcode, as: 'timeData', attributes: ['value_en', 'value_vi'] },
                        {
                            model: db.User, as: 'patientData', attributes: ['email', 'firstName', 'lastName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['value_en', 'value_vi'] },
                            ]
                        },
                    ],
                    order: [['id', 'ASC']],
                    where: {
                        doctorId: doctorId
                    }
                });
            } else {
                booking = await db.Booking.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'token'] },
                    include: [
                        { model: db.Allcode, as: 'statusData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Allcode, as: 'timeData', attributes: ['value_en', 'value_vi'] },
                        {
                            model: db.User, as: 'patientData', attributes: ['firstName', 'lastName', 'address', 'gender'],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: ['value_en', 'value_vi'] },
                            ]
                        },
                    ],
                    order: [['id', 'ASC']],
                });
            }
            resolve(booking);
        } catch (e) {
            reject(e);
        }
    })
}

let updateBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUpdate = {}
            if (data.isDone) {
                await db.Booking.update(
                    {
                        statusId: 'S3',
                    },
                    {
                        where: { id: data.id }
                    },
                )
                await emailServices.sendRemedyEmail({
                    email: data.email,
                    firstName: data.firstName,
                    file: data.file
                })
            } else {
                await db.Booking.update(
                    {
                        statusId: 'S4',
                    },
                    {
                        where: { id: data.id }
                    },
                )
            }
            resolve(dataUpdate)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllSchedule: getAllSchedule,
    bulkSchedule: bulkSchedule,
    getAllBooking: getAllBooking,
    getAllDoctor: getAllDoctor,
    updateBooking: updateBooking,
}