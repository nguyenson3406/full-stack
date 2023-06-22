import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let handUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true
                })
                if (userData) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0
                        userData.message = `ok!`
                        delete user.password
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

let getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (!userId) {
                users = await db.User.findAll({
                    attributes: ['id', 'email', 'firstName', 'lastName', 'address']
                });
            } else {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: ['id', 'email', 'firstName', 'lastName', 'address']
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataCreate = {}
            let isExist = await checkUserEmail(data.email);
            if (!isExist) {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender === 1 ? true : false,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber
                })
                dataCreate.message = `OK!`
                dataCreate.errCode = 0
            } else {
                dataCreate.message = 'email is exist'
                dataCreate.errCode = 4
            }
            resolve(dataCreate)
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUpdate = {}
            let isExist = await foundUser(data.id);
            if (isExist) {
                await db.User.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                    },
                    { where: { id: data.id } }
                )
                dataUpdate.message = 'update success'
                dataUpdate.errCode = 0
            } else {
                dataUpdate.message = `user isn't exist`
                dataUpdate.errCode = 2
            }
            resolve(dataUpdate)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await foundUser(id);
            let dataDelete = {}
            if (isExist) {
                await db.User.destroy({
                    where: { id: id }
                })
                dataDelete.message = 'delete success'
                dataDelete.errCode = 0
            } else {
                dataDelete.message = `User isn't exist`
                dataDelete.errCode = 2
            }
            resolve(dataDelete)
        } catch (e) {
            reject(e)
        }
    })
}

let foundUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
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

module.exports = {
    handUserLogin: handUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    checkUserEmail: checkUserEmail,
}