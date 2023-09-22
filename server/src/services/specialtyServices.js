import db from '../models/index';

let checkSpecialtyName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Specialty = await db.Specialty.findOne({
                where: { name: name }
            })
            if (Specialty) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialtys = ''
            if (!specialtyId) {
                specialtys = await db.Specialty.findAll({
                    attributes: ['id', 'name', 'show'],
                });
            } else {
                specialtys = await db.Specialty.findOne({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        { model: db.Allcode, as: 'servicesData', attributes: ['value_en', 'value_vi'] },
                    ],
                    where: { id: specialtyId },
                });
                if (specialtys.image) {
                    specialtys.image = new Buffer.from(specialtys.image, 'base64').toString('binary')
                }
            }
            resolve(specialtys);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataCreate = {}
            let isExist = await checkSpecialtyName(data.name);
            if (!isExist) {
                await db.Specialty.create({
                    name: data.name,
                    description: data.description,
                    image: data.image,
                    servicesId: data.servicesId,
                    show: true
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

let updateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUpdate = {}
            let isExist = await foundSpecialty(data.id);
            if (isExist) {
                await db.Specialty.update(
                    {
                        name: data.name,
                        description: data.description,
                        image: data.image,
                        servicesId: data.servicesId,
                    },
                    {
                        where: { id: data.id }
                    },
                )
                dataUpdate.message = 'update success'
                dataUpdate.errCode = 0
            } else {
                dataUpdate.message = `Specialty isn't exist`
                dataUpdate.errCode = 2
            }
            resolve(dataUpdate)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await foundSpecialty(id);
            let dataDelete = {}
            if (isExist) {
                await db.Specialty.destroy({
                    where: { id: id }
                })
                dataDelete.message = 'delete success'
                dataDelete.errCode = 0
            } else {
                dataDelete.message = `Specialty isn't exist`
                dataDelete.errCode = 2
            }
            resolve(dataDelete)
        } catch (e) {
            reject(e)
        }
    })
}

let foundSpecialty = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Specialty = await db.Specialty.findOne({
                where: { id: id }
            })
            if (Specialty) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let showSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataShow = {}
            let isExist = await foundSpecialty(data.id);
            if (isExist) {
                await db.Specialty.update({
                    show: data.show
                },
                    {
                        where: { id: data.id }
                    },
                )
                await db.Doctor_Infor.update({
                    show: data.show
                },
                    {
                        where: { specialtyId: data.id }
                    },
                )
                dataShow.message = 'update success'
                dataShow.errCode = 0
            } else {
                dataShow.message = `Specialty isn't exist`
                dataShow.errCode = 2
            }
            resolve(dataShow)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllSpecialty: getAllSpecialty,
    createNewSpecialty: createNewSpecialty,
    updateSpecialty: updateSpecialty,
    deleteSpecialty: deleteSpecialty,
    showSpecialty: showSpecialty,
}