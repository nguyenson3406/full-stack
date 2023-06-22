import axios from 'axios';

const handLoginApi = async (email, password) => {
    return await axios.post('http://localhost:8080/api/login', {
        email: email,
        password: password
    },
        { withCredentials: true }
    );
}

const handLogoutApi = async () => {
    return await axios.post('http://localhost:8080/api/logout', {}, {
        withCredentials: true
    });
}

const refreshTokenApi = async () => {
    try {
        let res = await axios.get('http://localhost:8080/api/refreshToken', {
            withCredentials: true
        })
        return res
    } catch (e) {
        let res = ''
        return res
    }
}

const authLogin = async (token) => {
    try {
        let res = await axios.get('http://localhost:8080/api/authLogin', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res
    } catch (e) {
        let res = ''
        return res
    }
}

export { handLoginApi, handLogoutApi, refreshTokenApi, authLogin }