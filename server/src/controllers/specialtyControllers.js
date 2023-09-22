import specialtyServices from '../services/specialtyServices';

let getAllSpecialty = async (req, res) => {
    let specialtyId = req.query.id
    let specialtyData = await specialtyServices.getAllSpecialty(specialtyId)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        specialty: specialtyData ? specialtyData : {}
    })
}

let createNewSpecialty = async (req, res) => {
    let name = req.body.name
    if (!name) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await specialtyServices.createNewSpecialty(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let updateSpecialty = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await specialtyServices.updateSpecialty(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let deleteSpecialty = async (req, res) => {
    let specialtyId = req.query.id
    if (!specialtyId) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await specialtyServices.deleteSpecialty(specialtyId)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let showSpecialty = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await specialtyServices.showSpecialty(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

module.exports = {
    getAllSpecialty: getAllSpecialty,
    createNewSpecialty: createNewSpecialty,
    updateSpecialty: updateSpecialty,
    deleteSpecialty: deleteSpecialty,
    showSpecialty: showSpecialty,
}