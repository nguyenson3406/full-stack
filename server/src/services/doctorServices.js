import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import manageServices from './manageServices'

const salt = bcrypt.genSaltSync(10);

let getAllDoctor = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (!userId) {
                users = await db.User.findAll({
                    attributes: ['id', 'email', 'firstName', 'lastName', 'address'],
                    include: [{ model: db.Doctor_Infor, attributes: ['show'] }],
                    where: { roleId: 'R3' }
                });
            } else {
                users = await db.User.findOne({
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
                    include: [
                        { model: db.Allcode, as: 'genderData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Allcode, as: 'roleData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                        { model: db.Markdown, attributes: ['contentMarkdown', 'description'] },
                        { model: db.Doctor_Infor, attributes: { exclude: ['id', 'doctorId', 'createdAt', 'updatedAt', 'show'] } },
                    ],
                    where: { id: userId },
                });
                if (users.image) {
                    users.image = new Buffer.from(users.image, 'base64').toString('binary')
                }
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataCreate = {}
            let isExist = await manageServices.checkUserEmail(data.email);
            if (!isExist) {
                let hashUserPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: 'R3',
                    phonenumber: data.phonenumber,
                    positionId: data.positionId,
                    image: data.image,
                    Markdown: [{
                        contentMarkdown: data.Markdown,
                        description: data.description,
                    }],
                    Doctor_Infor: [{
                        clinicId: data.clinicId,
                        specialtyId: data.specialtyId,
                        priceId: data.priceId,
                        provinceId: data.provinceId,
                        paymentId: data.paymentId,
                        note: data.note,
                        count: 0,
                        show: true,
                    }],
                },
                    {
                        include: [
                            { model: db.Markdown },
                            { model: db.Doctor_Infor },
                        ]
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

let updateDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUpdate = {}
            let isExist = await manageServices.foundUser(data.id);
            if (isExist) {
                await db.User.update(
                    {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        gender: data.gender,
                        phonenumber: data.phonenumber,
                        positionId: data.positionId,
                        image: data.image,
                    },
                    {
                        where: { id: data.id }
                    },
                )
                await db.Markdown.update({
                    contentMarkdown: data.Markdown,
                    description: data.description,
                },
                    {
                        where: { doctorId: data.id }
                    },
                )
                await db.Doctor_Infor.update({
                    clinicId: data.clinicId,
                    specialtyId: data.specialtyId,
                    priceId: data.priceId,
                    provinceId: data.provinceId,
                    paymentId: data.paymentId,
                    note: data.note,
                },
                    {
                        where: { doctorId: data.id }
                    },
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

let deleteDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await manageServices.foundUser(id);
            let dataDelete = {}
            if (isExist) {
                await db.User.destroy({
                    where: { id: id }
                })
                await db.Markdown.destroy({
                    where: { doctorId: id }
                })
                await db.Doctor_Infor.destroy({
                    where: { doctorId: id }
                })
                await db.Schedule.destroy({
                    where: { doctorId: id }
                })
                await db.Booking.destroy({
                    where: { doctorId: id }
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

let showDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataShow = {}
            let isExist = await manageServices.foundUser(data.id);
            if (isExist) {
                await db.Doctor_Infor.update({
                    show: data.show
                },
                    {
                        where: { doctorId: data.id }
                    },
                )
                dataShow.message = 'update success'
                dataShow.errCode = 0
            } else {
                dataShow.message = `user isn't exist`
                dataShow.errCode = 2
            }
            resolve(dataShow)
        } catch (e) {
            reject(e)
        }
    })
}

let handgetExtraInfo = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ''
            let extraInfo = ''
            let allcodes = await db.Allcode.findAll({
                attributes: ['key_map', 'type', 'value_en', 'value_vi'],
                where: { type: { [Op.ne]: "ROLE" } }
            })
            let clinics = await db.Clinic.findAll({
                attributes: ['id', 'name'],
            });
            let specialtys = await db.Specialty.findAll({
                attributes: ['id', 'name'],
            });
            extraInfo = {
                data: {
                    allcodes: allcodes,
                    clinics: clinics,
                    specialtys: specialtys,
                },
                message: 'get data success',
                errCode: 0
            }
            resolve(extraInfo);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllDoctor: getAllDoctor,
    createNewDoctor: createNewDoctor,
    updateDoctor: updateDoctor,
    deleteDoctor: deleteDoctor,
    showDoctor: showDoctor,
    handgetExtraInfo: handgetExtraInfo,
}