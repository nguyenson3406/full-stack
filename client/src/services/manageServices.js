import axios from 'axios';

const handGetUserApi = async (userId) => {
    let id = !userId ? '' : userId
    let res = await axios.get(`http://localhost:8080/api/manage/getAllUser?id=${id}`);
    return res
}

const handNewUserApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/manage/createNewUser', data);
    return res
}

const handUpdateUserApi = async (data) => {
    let res = await axios.put('http://localhost:8080/api/manage/updateUser', {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        phonenumber: data.phonenumber,
        positionId: data.positionId,
        image: data.image,
    });
    return res
}

const handDeleteUserApi = async (userId) => {
    let res = await axios.delete(`http://localhost:8080/api/manage/deleteUser?id=${userId}`);
    return res
}

const handChancePassword = async (data) => {
    let res = await axios.put(`http://localhost:8080/api/manage/chancePassword`, {
        email: data.email,
        CurrentPassword: data.CurrentPassword,
        NewPassword: data.NewPassword,
    });
    return res
}

export { handGetUserApi, handNewUserApi, handUpdateUserApi, handDeleteUserApi, handChancePassword }