import doctorServices from '../services/doctorServices';

let getAllDoctor = async (req, res) => {
    let userId = req.query.id
    let userData = await doctorServices.getAllDoctor(userId)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        user: userData ? userData : {}
    })
}

let createNewDoctor = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await doctorServices.createNewDoctor(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let updateDoctor = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await doctorServices.updateDoctor(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let deleteDoctor = async (req, res) => {
    let userId = req.query.id
    if (!userId) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await doctorServices.deleteDoctor(userId)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let uploadFile = async (req, res) => {
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    res.json({
        "uploaded": true,
        "url": `http://localhost:8080/api/page/getImage/${req.file.filename}`
    })
}

let showDoctor = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await doctorServices.showDoctor(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let handgetExtraInfo = async (req, res) => {
    let data = await doctorServices.handgetExtraInfo()
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
        data: data ? data.data : {}
    })
}

module.exports = {
    getAllDoctor: getAllDoctor,
    createNewDoctor: createNewDoctor,
    updateDoctor: updateDoctor,
    deleteDoctor: deleteDoctor,
    uploadFile: uploadFile,
    showDoctor: showDoctor,
    handgetExtraInfo: handgetExtraInfo,
}