import path from 'path';
var appRoot = require('app-root-path');
import pageServices from '../services/pageServices'
import searchServices from '../services/searchServices'

let getImage = async (req, res) => {
    let image = req.params.name;
    let filePath = path.join(__dirname, `../public/image/Markdown/${image}`);
    res.sendFile(filePath);
}

let getAllcode = async (req, res) => {
    let type = req.query.type
    let allcodeData = await pageServices.getAllcode(type)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        allcode: allcodeData ? allcodeData : {}
    })
}

let getAllDoctor = async (req, res) => {
    let doctorData = await pageServices.getDoctor()
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        doctor: doctorData ? doctorData : {}
    })
}

let getDoctor = async (req, res) => {
    let id = req.query.id
    let doctorData = await pageServices.getDoctor(id)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        doctor: doctorData ? doctorData : {}
    })
}

let getSchedule = async (req, res) => {
    let id = req.query.id
    let date = req.query.date
    let scheduleData = await pageServices.getSchedule(id, date)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        schedule: scheduleData ? scheduleData : {}
    })
}

let getDoctorInfor = async (req, res) => {
    let id = req.query.id
    let doctorInforData = await pageServices.getDoctorInfor(id)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        doctorInfor: doctorInforData ? doctorInforData : {}
    })
}

let getDoctorDescription = async (req, res) => {
    let id = req.query.id
    let doctorDescription = await pageServices.getDoctorDescription(id)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        data: doctorDescription ? doctorDescription : {}
    })
}

let getDoctorDeltail = async (req, res) => {
    let id = req.query.id
    let doctorDeltail = await pageServices.getDoctorDeltail(id)
    if (doctorDeltail) {
        return res.status(200).json({
            message: `OK!`,
            errCode: 0,
            data: doctorDeltail ? doctorDeltail : {}
        })
    } else {
        return res.status(200).json({
            message: `Doctor isn't exist`,
            errCode: 1,
        })
    }
}

let createBooking = async (req, res) => {
    let dataReq = req.body
    if (!dataReq.email || !dataReq.id || !dataReq.date || !dataReq.timeType) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await pageServices.createBooking(dataReq)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let verifyBooking = async (req, res) => {
    let dataReq = req.body
    if (!dataReq.token || !dataReq.doctorId) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await pageServices.verifyBooking(dataReq)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let getListSpecialty = async (req, res) => {
    let id = req.query.id
    let data = await pageServices.getListSpecialty(id)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getSpecialtyInfo = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await pageServices.getSpecialtyInfo(id)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getServicesInfor = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await pageServices.getServicesInfor(id)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getClinic = async (req, res) => {
    let id = req.query.id
    let data = await pageServices.getClinic(id)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getAllClinic = async (req, res) => {
    let data = await pageServices.getAllClinic()
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getDoctorClinic = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await pageServices.getDoctorClinic(id)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getBlog = async (req, res) => {
    let id = req.query.id
    let data = await pageServices.getBlog(id)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let getAllBlog = async (req, res) => {
    let id = req.query.id
    let data = await pageServices.getAllBlog(id)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

let searchData = async (req, res) => {
    let searchKey = req.query.searchKey
    let data = await searchServices.searchData(searchKey)
    return res.status(200).json({
        message: `OK`,
        errCode: 0,
        data: data ? data : {}
    })
}

module.exports = {
    getImage: getImage,
    getAllcode: getAllcode,
    getDoctor: getDoctor,
    getSchedule: getSchedule,
    getDoctorInfor: getDoctorInfor,
    getDoctorDescription: getDoctorDescription,
    getDoctorDeltail: getDoctorDeltail,
    createBooking: createBooking,
    verifyBooking: verifyBooking,
    getListSpecialty: getListSpecialty,
    getSpecialtyInfo: getSpecialtyInfo,
    getAllDoctor: getAllDoctor,
    getServicesInfor: getServicesInfor,
    getClinic: getClinic,
    getAllClinic: getAllClinic,
    getDoctorClinic: getDoctorClinic,
    getBlog: getBlog,
    getAllBlog: getAllBlog,
    searchData: searchData,
}