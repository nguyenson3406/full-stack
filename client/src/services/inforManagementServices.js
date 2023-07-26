import axios from 'axios';

const handGetDoctorApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/inforManagement/getAllSchedule?id=${id}`);
    return res
}

const handAddScheduleApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/inforManagement/bulkSchedule', data);
    return res
}

export {
    handGetDoctorApi,
    handAddScheduleApi,
}