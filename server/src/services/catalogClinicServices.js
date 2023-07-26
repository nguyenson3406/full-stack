import db from '../models/index';

let checkClinicName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Clinic = await db.Clinic.findOne({
                where: { name: name }
            })
            if (Clinic) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = (ClinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Clinics = ''
            if (!ClinicId) {
                Clinics = await db.Clinic.findAll({
                    attributes: ['id', 'name', 'address', 'show'],
                });
            } else {
                Clinics = await db.Clinic.findOne({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        { model: db.Markdown, attributes: ['contentMarkdown', 'description'] },
                    ],
                    where: { id: ClinicId },
                });
                if (Clinics.image) {
                    Clinics.image = new Buffer.from(Clinics.image, 'base64').toString('binary')
                }
            }
            resolve(Clinics);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataCreate = {}
            let isExist = await checkClinicName(data.name);
            if (!isExist) {
                await db.Clinic.create({
                    name: data.name,
                    provinceId: data.provinceId,
                    address: data.address,
                    image: data.image,
                    show: true,
                    Markdown: [{
                        contentMarkdown: data.Markdown,
                        description: data.description,
                    }],
                },
                    {
                        include: [
                            { model: db.Markdown },
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

let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUpdate = {}
            let isExist = await foundClinic(data.id);
            if (isExist) {
                await db.Clinic.update(
                    {
                        name: data.name,
                        provinceId: data.provinceId,
                        address: data.address,
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
                        where: { clinicId: data.id }
                    },
                )
                dataUpdate.message = 'update success'
                dataUpdate.errCode = 0
            } else {
                dataUpdate.message = `Clinic isn't exist`
                dataUpdate.errCode = 2
            }
            resolve(dataUpdate)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await foundClinic(id);
            let dataDelete = {}
            if (isExist) {
                await db.Clinic.destroy({
                    where: { id: id }
                })
                await db.Markdown.destroy({
                    where: { clinicId: id }
                })
                dataDelete.message = 'delete success'
                dataDelete.errCode = 0
            } else {
                dataDelete.message = `Clinic isn't exist`
                dataDelete.errCode = 2
            }
            resolve(dataDelete)
        } catch (e) {
            reject(e)
        }
    })
}

let foundClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Clinic = await db.Clinic.findOne({
                where: { id: id }
            })
            if (Clinic) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let showClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataShow = {}
            let isExist = await foundClinic(data.id);
            if (isExist) {
                await db.Clinic.update({
                    show: data.show
                },
                    {
                        where: { id: data.id }
                    },
                )
                dataShow.message = 'update success'
                dataShow.errCode = 0
            } else {
                dataShow.message = `Clinic isn't exist`
                dataShow.errCode = 2
            }
            resolve(dataShow)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllClinic: getAllClinic,
    createNewClinic: createNewClinic,
    updateClinic: updateClinic,
    deleteClinic: deleteClinic,
    showClinic: showClinic,
}