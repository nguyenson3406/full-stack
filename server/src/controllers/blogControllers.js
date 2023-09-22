import blogServices from '../services/blogServices';

let getAllBlog = async (req, res) => {
    let blogId = req.query.id
    let blogData = await blogServices.getAllBlog(blogId)
    return res.status(200).json({
        message: `OK!`,
        errCode: 0,
        blog: blogData ? blogData : {}
    })
}

let createNewBlog = async (req, res) => {
    let name = req.body.name
    if (!name) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await blogServices.createNewBlog(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let updateBlog = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await blogServices.updateBlog(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let deleteBlog = async (req, res) => {
    let blogId = req.query.id
    if (!blogId) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await blogServices.deleteBlog(blogId)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

let showBlog = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: `Mising your paramer`,
            errCode: 1
        })
    }
    let data = await blogServices.showBlog(req.body)
    return res.status(200).json({
        message: data.message,
        errCode: data.errCode,
    })
}

module.exports = {
    getAllBlog: getAllBlog,
    createNewBlog: createNewBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    showBlog: showBlog,
}