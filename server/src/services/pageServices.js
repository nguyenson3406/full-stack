import db from '../models/index';
import emailServices from './emailServices'
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
require('dotenv').config();

let getAllcode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = ''
            if (!type) {
                data = await db.Allcode.findAll({
                    attributes: ['key_map', 'value_en', 'value_vi'],
                    where: { type: { [Op.ne]: "ROLE" } }
                })
            } else {
                data = await db.Allcode.findAll({
                    attributes: ['key_map', 'value_en', 'value_vi'],
                    where: { type: type }
                })
            }
            resolve(data)
        } catch (e) {
            reject(e);
        }
    })
}

let getAllDoctor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            users = await db.User.findAll({
                attributes: ['id', 'firstName', 'positionId', 'lastName', 'image'],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                    { model: db.Doctor_Infor, attributes: ['show'], where: { show: true } },
                ],
                order: [[{ model: db.Doctor_Infor }, 'count', 'DESC']],
                where: { roleId: 'R3' },
            });
            if (users && users.length > 0) {
                users.map((item) => {
                    if (item.image) {
                        item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctor = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (!specialtyId) {
                users = await db.User.findAll({
                    attributes: ['id', 'firstName', 'positionId', 'lastName', 'image'],
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                        {
                            model: db.Doctor_Infor, attributes: ['show'],
                            include: [
                                { model: db.Specialty, as: 'specialtyData' },
                            ],
                            where: { show: true }
                        },
                    ],
                    order: [[{ model: db.Doctor_Infor }, 'count', 'DESC']],
                    where: { roleId: 'R3' },
                    limit: 10
                });
                if (users && users.length > 0) {
                    users.map((item) => {
                        if (item.image) {
                            item.image = new Buffer.from(item.image, 'base64').toString('binary')
                        }
                    })
                }
            } else {
                users = await db.Doctor_Infor.findAll({
                    attributes: ['doctorId', 'provinceId', 'count'],
                    include: [
                        { model: db.Allcode, as: 'provinceData', attributes: ['value_en', 'value_vi'] },
                    ],
                    where: {
                        specialtyId: specialtyId,
                        show: true
                    },
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctorDescription = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            users = await db.User.findOne({
                attributes: ['id', 'firstName', 'positionId', 'lastName', 'image'],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                    {
                        model: db.Doctor_Infor, attributes: ['provinceId'],
                        include: [
                            { model: db.Allcode, as: 'priceData', attributes: ['value_en', 'value_vi'] },
                            { model: db.Allcode, as: 'provinceData', attributes: ['value_en', 'value_vi'] }]
                    },
                    { model: db.Markdown, attributes: ['description'] },
                ],
                where: { id: userId },
            });
            if (users.image) {
                users.image = new Buffer.from(users.image, 'base64').toString('binary')
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctorDeltail = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            users = await db.User.findOne({
                attributes: ['id'],
                include: [
                    { model: db.Markdown, attributes: ['contentMarkdown'] },
                ],
                where: {
                    [Op.and]: [
                        { id: userId },
                        { roleId: 'R3' }
                    ]
                },
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getSchedule = (userId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = await db.Schedule.findAll({
                attributes: { exclude: ['doctorId', 'createdAt', 'updatedAt'] },
                include: [
                    { model: db.Allcode, as: 'timeData', attributes: ['value_en', 'value_vi'] },
                ],
                where: {
                    [Op.and]: [
                        { doctorId: userId },
                        { date: date }
                    ]
                },
            })
            resolve(schedule)
        } catch (e) {
            reject(e)
        }
    })
}

let getDoctorInfor = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctorInfor = await db.Doctor_Infor.findOne({
                attributes: ['note', 'paymentId'],
                include: [
                    { model: db.Allcode, as: 'priceData', attributes: ['value_en', 'value_vi'] },
                    { model: db.Allcode, as: 'paymentData', attributes: ['value_en', 'value_vi'] },
                    { model: db.Clinic, as: 'clinicData', attributes: ['name', 'address'] },
                ],
                where: { doctorId: userId },
            })
            resolve(doctorInfor)
        } catch (e) {
            reject(e)
        }
    })
}

let createBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataBooking = {}
            let isExist = await foundSchedule(data.scheduleId)
            if (isExist) {
                let token = uuidv4()
                let url_email = `${process.env.URL_REACT}verify-booking?token=${token}&doctorId=${data.id}`
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        gender: data.gender,
                        roleId: 'R4',
                        phonenumber: data.phonenumber,
                    }
                });
                await db.Booking.create({
                    statusId: 'S1',
                    doctorId: data.id,
                    patientId: user[0].id,
                    date: data.date,
                    timeType: data.timeType,
                    token: token
                })
                await db.Schedule.increment(
                    { currentNumber: 1 },
                    {
                        where: { id: data.scheduleId }
                    })
                await emailServices.sendSimpleEmail({
                    email: data.email,
                    firstName: data.firstName,
                    timeData: data.timeData,
                    doctorName: data.doctorName,
                    redirectLink: url_email
                })
                dataBooking.message = `OK!`
                dataBooking.errCode = 0
            } else {
                dataBooking.message = `Schedule isn't exist`
                dataBooking.errCode = 2
            }
            resolve(dataBooking)
        } catch (e) {
            reject(e)
        }
    })
}

let foundSchedule = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Schedule = await db.Schedule.findOne({
                where: {
                    id: id,
                },
            })
            if (!Schedule.currentNumber || Schedule.currentNumber <= 4) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let verifyBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Booking = await db.Booking.findOne({
                where: {
                    doctorId: data.doctorId,
                    token: data.token,
                    statusId: 'S1',
                },
            })
            if (Booking) {
                Booking.statusId = 'S2'
                await Booking.save();
                resolve({
                    errCode: 0,
                    message: `Update the appointment succeed!`
                })
            } else {
                resolve({
                    errCode: 2,
                    message: `Appointment has been activated or does not exist`
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getListSpecialty = (servicesId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = ''
            if (!servicesId) {
                specialty = await db.Specialty.findAll({
                    attributes: ['id', 'name', 'image'],
                    where: {
                        servicesId: 'ST1',
                        show: true
                    },
                    limit: 10
                });
            } else {
                specialty = await db.Specialty.findAll({
                    attributes: ['id', 'name', 'image'],
                    where: {
                        servicesId: servicesId,
                        show: true
                    },
                });
            }
            if (specialty && specialty.length > 0) {
                specialty.map((item) => {
                    if (item.image) {
                        item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    }
                })
            }
            resolve(specialty);
        } catch (e) {
            reject(e);
        }
    })
}

let getSpecialtyInfo = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialty = ''
            specialty = await db.Specialty.findOne({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    { model: db.Allcode, as: 'servicesData', attributes: ['value_en', 'value_vi'] },
                ],
                where: { id: specialtyId },
            });
            if (specialty.image) {
                specialty.image = new Buffer.from(specialty.image, 'base64').toString('binary')
            }
            resolve(specialty);
        } catch (e) {
            reject(e);
        }
    })
}

let getServicesInfor = (servicesId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let servicesInfor = await db.User.findAll({
                attributes: ['id', 'firstName', 'positionId', 'lastName', 'image'],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['value_en', 'value_vi'] },
                    {
                        model: db.Doctor_Infor, attributes: ['show'],
                        include: [
                            { model: db.Specialty, as: 'specialtyData', where: { servicesId: servicesId } },
                        ],
                        where: { show: true }
                    },
                ],
                order: [[{ model: db.Doctor_Infor }, 'count', 'DESC']],
                where: { roleId: 'R3' },
                limit: 10
            });
            if (servicesInfor && servicesInfor.length > 0) {
                servicesInfor.map((item) => {
                    if (item.image) {
                        item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    }
                })
            }
            resolve(servicesInfor)
        } catch (e) {
            reject(e)
        }
    })
}

let getClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = ''
            if (!clinicId) {
                clinic = await db.Clinic.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    where: { show: true },
                    limit: 10
                });
                if (clinic && clinic.length > 0) {
                    clinic.map((item) => {
                        if (item.image) {
                            item.image = new Buffer.from(item.image, 'base64').toString('binary')
                        }
                    })
                }
            } else {
                clinic = await db.Clinic.findOne({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        { model: db.Markdown, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    ],
                    where: { id: clinicId },
                });
                if (clinic.image) {
                    clinic.image = new Buffer.from(clinic.image, 'base64').toString('binary')
                }
            }

            resolve(clinic);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = ''
            clinic = await db.Clinic.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: { show: true },
            });
            if (clinic && clinic.length > 0) {
                clinic.map((item) => {
                    if (item.image) {
                        item.image = new Buffer.from(item.image, 'base64').toString('binary')
                    }
                })
            }
            resolve(clinic);
        } catch (e) {
            reject(e);
        }
    })
}

let getDoctorClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            users = await db.Doctor_Infor.findAll({
                attributes: ['doctorId', 'provinceId', 'count'],
                include: [
                    { model: db.Allcode, as: 'provinceData', attributes: ['value_en', 'value_vi'] },
                ],
                where: {
                    clinicId: clinicId,
                    show: true
                },
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getBlog = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = ''
            if (!blogId) {
                blog = await db.Blog.findAll({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        { model: db.Markdown, attributes: ['description'] },
                    ],
                    order: [['updatedAt', 'DESC']],
                    where: { show: true },
                    limit: 8
                });
                if (blog && blog.length > 0) {
                    blog.map((item) => {
                        if (item.image) {
                            item.image = new Buffer.from(item.image, 'base64').toString('binary')
                        }
                    })
                }
            } else {
                blog = await db.Blog.findOne({
                    include: [
                        { model: db.Markdown, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                    ],
                    where: { id: blogId },
                });
                if (blog.image) {
                    blog.image = new Buffer.from(blog.image, 'base64').toString('binary')
                }
            }

            resolve(blog);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllBlog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = ''
            if (!id) {
                blog = await db.Blog.findAll({
                    include: [
                        { model: db.Markdown, attributes: ['description'] },
                    ],
                    order: [['updatedAt', 'DESC']],
                    where: { show: true },
                });
                if (blog && blog.length > 0) {
                    blog.map((item) => {
                        if (item.image) {
                            item.image = new Buffer.from(item.image, 'base64').toString('binary')
                        }
                    })
                }
            } else {
                let nextBlog = await db.Blog.findOne({
                    attributes: ['id'],
                    where: {
                        show: true,
                        id: { [Op.gt]: id, }
                    },
                });
                let prevBlog = await db.Blog.findOne({
                    attributes: ['id'],
                    order: [['id', 'DESC']],
                    where: {
                        show: true,
                        id: { [Op.lt]: id, }
                    },
                });
                blog = {
                    nextBlog: nextBlog ? nextBlog.id : '',
                    prevBlog: prevBlog ? prevBlog.id : ''
                }
            }
            resolve(blog);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllcode: getAllcode,
    getAllDoctor: getAllDoctor,
    getDoctorDescription: getDoctorDescription,
    getDoctor: getDoctor,
    getSchedule: getSchedule,
    getDoctorInfor: getDoctorInfor,
    getDoctorDeltail: getDoctorDeltail,
    createBooking: createBooking,
    verifyBooking: verifyBooking,
    getListSpecialty: getListSpecialty,
    getSpecialtyInfo: getSpecialtyInfo,
    getServicesInfor: getServicesInfor,
    getClinic: getClinic,
    getAllClinic: getAllClinic,
    getDoctorClinic: getDoctorClinic,
    getBlog: getBlog,
    getAllBlog: getAllBlog,
}