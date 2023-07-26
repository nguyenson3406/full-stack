import axios from 'axios';

const handGetAllcodeApi = async (typeData) => {
    let type = !typeData ? '' : typeData
    let res = await axios.get(`http://localhost:8080/api/page/getAllcode?type=${type}`);
    return res
}

export {
    handGetAllcodeApi,
}