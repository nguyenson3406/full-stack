import db from '../models/index';

let checkBlogName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.Blog.findOne({
                where: { name: name }
            })
            if (blog) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllBlog = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blogs = ''
            if (!blogId) {
                blogs = await db.Blog.findAll({
                    attributes: ['id', 'name', 'author', 'show'],
                });
            } else {
                blogs = await db.Blog.findOne({
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [
                        { model: db.Markdown, attributes: ['contentMarkdown', 'description'] },
                    ],
                    where: { id: blogId },
                });
                if (blogs.image) {
                    blogs.image = new Buffer.from(blogs.image, 'base64').toString('binary')
                }
            }
            resolve(blogs);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataCreate = {}
            let isExist = await checkBlogName(data.name);
            if (!isExist) {
                await db.Blog.create({
                    name: data.name,
                    author: data.author,
                    image: data.image,
                    show: true,
                    Markdown: [{
                        contentMarkdown: data.Markdown,
                        description: data.description,
                    }],
                },
                    {
                        include: [
                            { model: db.Markdown },
                        ]
                    })
                dataCreate.message = `OK!`
                dataCreate.errCode = 0
            } else {
                dataCreate.message = 'email is exist'
                dataCreate.errCode = 4
            }
            resolve(dataCreate)
        } catch (e) {
            reject(e)
        }
    })
}

let updateBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataUpdate = {}
            let isExist = await foundBlog(data.id);
            if (isExist) {
                await db.Blog.update(
                    {
                        name: data.name,
                        author: data.author,
                        image: data.image,
                    },
                    {
                        where: { id: data.id }
                    },
                )
                await db.Markdown.update({
                    contentMarkdown: data.Markdown,
                    description: data.description,
                },
                    {
                        where: { BlogId: data.id }
                    },
                )
                dataUpdate.message = 'update success'
                dataUpdate.errCode = 0
            } else {
                dataUpdate.message = `blog isn't exist`
                dataUpdate.errCode = 2
            }
            resolve(dataUpdate)
        } catch (e) {
            reject(e)
        }
    })
}

let deleteBlog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = await foundBlog(id);
            let dataDelete = {}
            if (isExist) {
                await db.Blog.destroy({
                    where: { id: id }
                })
                await db.Markdown.destroy({
                    where: { BlogId: id }
                })
                dataDelete.message = 'delete success'
                dataDelete.errCode = 0
            } else {
                dataDelete.message = `blog isn't exist`
                dataDelete.errCode = 2
            }
            resolve(dataDelete)
        } catch (e) {
            reject(e)
        }
    })
}

let foundBlog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let blog = await db.Blog.findOne({
                where: { id: id }
            })
            if (blog) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let showBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataShow = {}
            let isExist = await foundBlog(data.id);
            if (isExist) {
                await db.Blog.update({
                    show: data.show
                },
                    {
                        where: { id: data.id }
                    },
                )
                dataShow.message = 'update success'
                dataShow.errCode = 0
            } else {
                dataShow.message = `blog isn't exist`
                dataShow.errCode = 2
            }
            resolve(dataShow)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getAllBlog: getAllBlog,
    createNewBlog: createNewBlog,
    updateBlog: updateBlog,
    deleteBlog: deleteBlog,
    showBlog: showBlog,
}