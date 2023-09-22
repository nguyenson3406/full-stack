import axios from 'axios';

const handGetClinicApi = async (clinicId) => {
    let id = !clinicId ? '' : clinicId
    let res = await axios.get(`http://localhost:8080/api/catalogClinic/getAllClinic?id=${id}`);
    return res
}

const handNewClinicApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/catalogClinic/createNewClinic', data);
    return res
}

const handUpdateClinicApi = async (data) => {
    let res = await axios.put('http://localhost:8080/api/catalogClinic/updateClinic', data);
    return res
}

const handDeleteClinicApi = async (clinicId) => {
    let res = await axios.delete(`http://localhost:8080/api/catalogClinic/deleteClinic?id=${clinicId}`);
    return res
}

const handShowClinic = async (data) => {
    let res = await axios.put(`http://localhost:8080/api/catalogClinic/showClinic`, {
        id: data.id,
        show: data.show,
    });
    return res
}

export {
    handGetClinicApi,
    handNewClinicApi,
    handUpdateClinicApi,
    handDeleteClinicApi,
    handShowClinic
}