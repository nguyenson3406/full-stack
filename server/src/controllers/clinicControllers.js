import clinicServices from '../services/clinicServices';

let getAllClinic = async (req, res) => {
    let clinicId = req.query.id
    let clinicData = await clinicServices.getAllClinic(clinicId)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        clinic: clinicData ? clinicData : {}
    })
}

let createNewClinic = async (req, res) => {
    let name = req.body.name
    if (!name) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await clinicServices.createNewClinic(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let updateClinic = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await clinicServices.updateClinic(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let deleteClinic = async (req, res) => {
    let clinicId = req.query.id
    if (!clinicId) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await clinicServices.deleteClinic(clinicId)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let showClinic = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await clinicServices.showClinic(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

module.exports = {
    getAllClinic: getAllClinic,
    createNewClinic: createNewClinic,
    updateClinic: updateClinic,
    deleteClinic: deleteClinic,
    showClinic: showClinic,
}