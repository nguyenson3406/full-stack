import inforManagementServices from '../services/inforManagementServices';

let getAllSchedule = async (req, res) => {
    let doctorId = req.query.id
    let doctorData = await inforManagementServices.getAllSchedule(doctorId)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        doctor: doctorData ? doctorData : {}
    })
}

let bulkSchedule = async (req, res) => {
    let schedule = req.body
    let data = await inforManagementServices.bulkSchedule(schedule)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

module.exports = {
    getAllSchedule: getAllSchedule,
    bulkSchedule: bulkSchedule,
}