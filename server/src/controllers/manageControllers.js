import manageServices from '../services/manageServices';

let getAllUser = async (req, res) => {
    let userId = req.query.id
    let userData = await manageServices.getAllUser(userId)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        user: userData ? userData : {}
    })
}

let createNewUser = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await manageServices.createNewUser(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let updateUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await manageServices.updateUser(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let deleteUser = async (req, res) => {
    let userId = req.query.id
    if (!userId) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await manageServices.deleteUser(userId)
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

let chancePassword = async (req, res) => {
    let email = req.body.email
    let CurrentPassword = req.body.CurrentPassword
    if (!email || !CurrentPassword) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await manageServices.chancePassword(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

module.exports = {
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    uploadFile: uploadFile,
    chancePassword: chancePassword,
}