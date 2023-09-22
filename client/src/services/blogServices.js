import axios from 'axios';

const handGetBlogApi = async (blogId) => {
    let id = !blogId ? '' : blogId
    let res = await axios.get(`http://localhost:8080/api/catalogBlog/getAllBlog?id=${id}`);
    return res
}

const handNewBlogApi = async (data) => {
    let res = await axios.post('http://localhost:8080/api/catalogBlog/createNewBlog', data);
    return res
}

const handUpdateBlogApi = async (data) => {
    let res = await axios.put('http://localhost:8080/api/catalogBlog/updateBlog', data);
    return res
}

const handDeleteBlogApi = async (blogId) => {
    let res = await axios.delete(`http://localhost:8080/api/catalogBlog/deleteBlog?id=${blogId}`);
    return res
}

const handShowBlog = async (data) => {
    let res = await axios.put(`http://localhost:8080/api/catalogBlog/showBlog`, {
        id: data.id,
        show: data.show,
    });
    return res
}

export {
    handGetBlogApi,
    handNewBlogApi,
    handUpdateBlogApi,
    handDeleteBlogApi,
    handShowBlog
}