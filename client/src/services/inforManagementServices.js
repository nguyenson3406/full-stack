import axios from 'axios';

const handGetScheduleApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/inforManagement/getAllSchedule?id=${id}`);
    return res
}

const handGetDoctorApi = async () => {
    let res = await axios.get(`http://localhost:8080/api/inforManagement/getAllDoctor`);
    return res
}

const handAddScheduleApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/inforManagement/bulkSchedule', data);
    return res
}

const handGetAllBookingApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/inforManagement/getAllBooking?id=${id}`);
    return res
}

const handUpdateBookingApi = async (data) => {
    let res = await axios.put(`http://localhost:8080/api/inforManagement/updateBooking`, data);
    return res
}

export {
    handGetScheduleApi,
    handGetDoctorApi,
    handAddScheduleApi,
    handGetAllBookingApi,
    handUpdateBookingApi,
}