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

let getAllBooking = async (req, res) => {
    let doctorId = req.query.id
    let data = await inforManagementServices.getAllBooking(doctorId)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getAllDoctor = async (req, res) => {
    let data = await inforManagementServices.getAllDoctor()
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        data: data ? data : {}
    })
}

let updateBooking = async (req, res) => {
    let data = req.body
    let dataBooking = await inforManagementServices.updateBooking(data)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        data: dataBooking ? dataBooking : {}
    })
}

module.exports = {
    getAllSchedule: getAllSchedule,
    bulkSchedule: bulkSchedule,
    getAllBooking: getAllBooking,
    getAllDoctor: getAllDoctor,
    updateBooking: updateBooking,
}