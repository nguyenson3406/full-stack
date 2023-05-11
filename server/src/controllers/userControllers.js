import userServices from '../services/userServices';

let handLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }

    let userData = await userServices.handUserLogin(email, password)
    return res.status(200).json({
        message: userData.message,
        errCode: userData.errCode,
        user: userData.user ? userData.user : {}
    })
}

let getAllUser = async (req, res) => {
    let userId = req.query.id
    let userData = await userServices.getAllUser(userId)
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
    let data = await userServices.createNewUser(req.body)
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
    let data = await userServices.updateUser(req.body)
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
    let data = await userServices.deleteUser(userId)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

module.exports = {
    handLogin: handLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}