import db from "../models/index"
import { Op } from 'sequelize';

let getAllDoctor = (keySearch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = []
            let users = ''
            users = await db.User.findAll({
                attributes: ['id', 'firstName', 'lastName'],
                include: [
                    { model: db.Doctor_Infor, attributes: ['show'], where: { show: true } },
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                ],
                where: {
                    roleId: 'R3',
                    [Op.or]: [
                        { firstName: { [Op.like]: keySearch } },
                        { lastName: { [Op.like]: keySearch } }
                    ]
                },
                limit: 8,
            });
            if (users && users.length > 0) {
                users.map((item, index) => {
                    doctor[index] = {
                        id: item.id,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        value_en: item.positionData.value_en,
                        value_vi: item.positionData.value_vi
                    }
                })
            }
            resolve(doctor);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinic = (keySearch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Clinics = ''
            Clinics = await db.Clinic.findAll({
                attributes: ['id', 'name', 'address'],
                where: {
                    show: true,
                    name: { [Op.like]: keySearch },
                },
                limit: 8,
                raw: true
            });
            resolve(Clinics);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllBlog = (keySearch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogs = await db.Blog.findAll({
                attributes: ['id', 'name', 'author'],
                where: {
                    show: true,
                    [Op.or]: [
                        { name: { [Op.like]: keySearch } },
                        { author: { [Op.like]: keySearch } }
                    ]
                },
                limit: 8,
                raw: true
            });
            resolve(blogs);
        } catch (e) {
            reject(e);
        }
    })
}

let searchData = (keySearch) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataSearch = {}
            let key = `%${keySearch}%`
            let doctor = await getAllDoctor(key)
            //     attributes: ['id', 'firstName', 'lastName'],
            //     include: [
            //         { model: db.Doctor_Infor, attributes: ['show'], where: { show: true } },
            //         { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
            //     ],
            //     where: {
            //         roleId: 'R3',
            //         [Op.or]: [
            //             { firstName: { [Op.like]: key } },
            //             { lastName: { [Op.like]: key } }
            //         ]
            //     },
            //     raw: true
            // });
            let clinic = await getAllClinic(key)
            let blog = await getAllBlog(key)
            dataSearch.doctor = doctor
            dataSearch.clinic = clinic
            dataSearch.blog = blog
            resolve(dataSearch)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    searchData: searchData,
}