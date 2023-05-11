import axios from 'axios';

const handGetUserApi = async (userId) => {
    let id = !userId ? '' : userId
    let res = await axios.get(`http://localhost:8080/api/getAllUser?id=${id}`);
    return res
}

const handNewUserApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/createNewUser', data);
    return res
}

const handUpdateUserApi = async (data) => {
    let res = await axios.put('http://localhost:8080/api/updateUser', {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
    });
    return res
}

const handDeleteUserApi = async (userId) => {
    let res = await axios.delete(`http://localhost:8080/api/deleteUser?id=${userId}`);
    return res
}

export { handGetUserApi, handNewUserApi, handUpdateUserApi, handDeleteUserApi }