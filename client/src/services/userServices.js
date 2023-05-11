import axios from 'axios';

const handLoginApi = async (email, password) => {
    return await axios.post('http://localhost:8080/api/login', {
        email: email,
        password: password
    });
}

export { handLoginApi }