import authServices from '../services/authServices';

let handLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }

    let userData = await authServices.handUserLogin(email, password)
    res.cookie('jwt', userData.refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({
        message: userData.message,
        errCode: userData.errCode,
        user: userData.user ? userData.user : {},
        accessToken: userData.accessToken
    })
}

const handLogout = (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) return res.sendStatus(204)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.status(200).json({ message: 'Cookie cleared' })
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) return res.status(401).json({ message: 'Unauthorized' })
    const refreshToken = cookies.jwt
    let data = await authServices.refreshToken(refreshToken)
    if (data.errCode !== 0) return res.status(401).json({ message: 'Unauthorized' })
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
        user: data.user ? data.user : {},
        accessToken: data.accessToken
    })
}

const authLogin = async (req, res) => {
    let user = req.user
    let data = await authServices.authLogin(user)
    if (data.errCode !== 0) return res.status(401).json({ message: 'Unauthorized' })
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
        user: data.user ? data.user : {},
    })
}

module.exports = {
    handLogin: handLogin,
    handLogout: handLogout,
    refreshToken: refreshToken,
    authLogin: authLogin
}