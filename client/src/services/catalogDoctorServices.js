import axios from 'axios';

const handGetDoctorApi = async (doctorId) => {
    let id = !doctorId ? '' : doctorId
    let res = await axios.get(`http://localhost:8080/api/catalogDoctor/getAllDoctor?id=${id}`);
    return res
}

const handNewDoctorApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/catalogDoctor/createNewDoctor', data);
    return res
}

const handUpdateDoctorApi = async (data) => {
    let res = await axios.put('http://localhost:8080/api/catalogDoctor/updateDoctor', data);
    return res
}

const handDeleteDoctorApi = async (doctorId) => {
    let res = await axios.delete(`http://localhost:8080/api/catalogDoctor/deleteDoctor?id=${doctorId}`);
    return res
}

const handShowDoctor = async (data) => {
    let res = await axios.put(`http://localhost:8080/api/catalogDoctor/showDoctor`, {
        id: data.id,
        show: data.show,
    });
    return res
}

const handgetExtraInfoApi = async () => {
    let res = await axios.get(`http://localhost:8080/api/catalogDoctor/getExtraInfo`);
    return res
}

export {
    handGetDoctorApi,
    handNewDoctorApi,
    handUpdateDoctorApi,
    handDeleteDoctorApi,
    handShowDoctor,
    handgetExtraInfoApi,
}