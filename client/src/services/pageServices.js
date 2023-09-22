import axios from 'axios';

const handGetAllcodeApi = async (typeData) => {
    let type = !typeData ? '' : typeData
    let res = await axios.get(`http://localhost:8080/api/page/getAllcode?type=${type}`);
    return res
}

const handGetAllDoctorApi = async () => {
    let res = await axios.get(`http://localhost:8080/api/page/getAllDoctor`);
    return res
}

const handGetDoctorApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/page/getDoctor?id=${id}`);
    return res
}

const handGetScheduleApi = async (doctorId, date) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/page/getSchedule?id=${id}&date=${date}`);
    return res
}

const handGetDoctorInforApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/page/getDoctorInfor?id=${id}`);
    return res
}

const handGetDoctorDescriptionApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/page/getDoctorDescription?id=${id}`);
    return res
}

const handGetDoctorDeltailApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/page/getDoctorDeltail?id=${id}`);
    return res
}

const handCreateBookingApi = async (data) => {
    let res = await axios.post(`http://localhost:8080/api/page/createBooking`, data);
    return res
}

const handVerifyBookingApi = async (data) => {
    let res = await axios.post(`http://localhost:8080/api/page/verifyBooking`, data);
    return res
}

const handGetListSpecialtyApi = async (specialtyId) => {
    let id = !specialtyId ? '' : specialtyId
    let res = await axios.get(`http://localhost:8080/api/page/getListSpecialty?id=${id}`);
    return res
}

const handGetSpecialtyInfoApi = async (specialtyId) => {
    let id = !specialtyId ? '' : specialtyId
    let res = await axios.get(`http://localhost:8080/api/page/getSpecialtyInfo?id=${id}`);
    return res
}

const handGetServicesInforApi = async (servicesId) => {
    let id = !servicesId ? '' : servicesId
    let res = await axios.get(`http://localhost:8080/api/page/getServicesInfor?id=${id}`);
    return res
}

const handGetClinicApi = async (clinicId) => {
    let id = !clinicId ? '' : clinicId
    let res = await axios.get(`http://localhost:8080/api/page/getClinic?id=${id}`);
    return res
}

const handGetAllClinicApi = async () => {
    let res = await axios.get(`http://localhost:8080/api/page/getAllClinic`);
    return res
}

const handGetDoctorClinicApi = async (clinicId) => {
    let id = !clinicId ? '' : clinicId
    let res = await axios.get(`http://localhost:8080/api/page/getDoctorClinic?id=${id}`);
    return res
}

const handGetBlogApi = async (blogId) => {
    let id = !blogId ? '' : blogId
    let res = await axios.get(`http://localhost:8080/api/page/getBlog?id=${id}`);
    return res
}

const handGetAllBlogApi = async (blogId) => {
    let id = !blogId ? '' : blogId
    let res = await axios.get(`http://localhost:8080/api/page/getAllBlog?id=${id}`);
    return res
}

const handSearchDataApi = async (key) => {
    let searchKey = !key ? '' : key
    let res = await axios.get(`http://localhost:8080/api/page/searchData?searchKey=${searchKey}`);
    return res
}

export {
    handGetAllcodeApi,
    handGetAllDoctorApi,
    handGetDoctorApi,
    handGetScheduleApi,
    handGetDoctorInforApi,
    handGetDoctorDescriptionApi,
    handGetDoctorDeltailApi,
    handCreateBookingApi,
    handVerifyBookingApi,
    handGetListSpecialtyApi,
    handGetSpecialtyInfoApi,
    handGetServicesInforApi,
    handGetClinicApi,
    handGetAllClinicApi,
    handGetDoctorClinicApi,
    handGetBlogApi,
    handGetAllBlogApi,
    handSearchDataApi,
}