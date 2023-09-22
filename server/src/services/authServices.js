import db from '../models/index';
import bcrypt from 'bcryptjs';
import jwt, { decode } from 'jsonwebtoken'
require('dotenv').config();

const createAccessToken = (userName) => {
    let accessToken = jwt.sign(
        { "username": userName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    );

    return accessToken
}

const createRefreshToken = (userName) => {
    let refreshToken = jwt.sign(
        { "username": userName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    return refreshToken
}

const refreshToken = async (refreshToken) => {
    let data = {};
    try {
        let decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
        );
        let isExist = await checkUserEmail(decoded.username);
        if (isExist) {
            let accessToken = createAccessToken(decoded.username);
            let user = await db.User.findOne({
                attributes: ['id', 'email', 'firstName', 'roleId', 'image'],
                where: { email: decoded.username },
                raw: true
            })
            if (user.image) {
                user.image = new Buffer.from(user.image, 'base64').toString('binary')
            }
            data.errCode = 0
            data.message = `ok!`
            data.accessToken = accessToken
            data.user = user
        } else {
            data.errCode = 2
            data.message = `Your's email isn't exist`
        }
    } catch (e) {
        data.errCode = 1
    }
    return data;
}


let handUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let accessToken = createAccessToken(email);
            let refreshToken = createRefreshToken(email)
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'password', 'firstName', 'roleId', 'image'],
                    where: { email: email },
                    raw: true
                })
                if (userData) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        if (user.image) {
                            user.image = new Buffer.from(user.image, 'base64').toString('binary')
                        }
                        userData.errCode = 0
                        userData.message = `ok!`
                        delete user.password
                        userData.accessToken = accessToken
                        userData.refreshToken = refreshToken
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.message = `Your's passwork is wrong`
                    }
                } else {
                    userData.message = `Your's email isn't exist`
                    userData.errCode = 2
                }
            } else {
                userData.message = `Your's email isn't exist`
                userData.errCode = 2
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

const authLogin = (email) => {
    return new Promise(async (reslove, reject) => {
        try {
            let data = {};
            let isExist = checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'firstName', 'roleId', 'image'],
                    where: { email: email },
                    raw: true
                })
                if (user.image) {
                    user.image = new Buffer.from(user.image, 'base64').toString('binary')
                }
                data.errCode = 0;
                data.message = 'ok!';
                data.user = user;
            } else {
                data.errCode = 2;
                data.message = `Your's email isn't exist`;
            }
            reslove(data)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    refreshToken: refreshToken,
    handUserLogin: handUserLogin,
    authLogin: authLogin,
}