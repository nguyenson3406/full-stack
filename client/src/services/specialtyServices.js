import axios from 'axios';

const handGetSpecialtyApi = async (specialtyId) => {
    let id = !specialtyId ? '' : specialtyId
    let res = await axios.get(`http://localhost:8080/api/catalogSpecialty/getAllSpecialty?id=${id}`);
    return res
}

const handNewSpecialtyApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/catalogSpecialty/createNewSpecialty', data);
    return res
}

const handUpdateSpecialtyApi = async (data) => {
    let res = await axios.put('http://localhost:8080/api/catalogSpecialty/updateSpecialty', data);
    return res
}

const handDeleteSpecialtyApi = async (specialtyId) => {
    let res = await axios.delete(`http://localhost:8080/api/catalogSpecialty/deleteSpecialty?id=${specialtyId}`);
    return res
}

const handShowSpecialty = async (data) => {
    let res = await axios.put(`http://localhost:8080/api/catalogSpecialty/showSpecialty`, {
        id: data.id,
        show: data.show,
    });
    return res
}

export {
    handGetSpecialtyApi,
    handNewSpecialtyApi,
    handUpdateSpecialtyApi,
    handDeleteSpecialtyApi,
    handShowSpecialty
}