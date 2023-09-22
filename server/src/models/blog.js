'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {

        static associate(models) {
            // define association here
            Blog.hasOne(models.Markdown, { foreignKey: 'blogId' })
            Blog.belongsTo(models.Specialty, { foreignKey: 'specialtyId', as: 'specialtyBlogData' })
        }
    };
    Blog.init({
        name: DataTypes.STRING,
        author: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
        show: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Blog',
        tableName: 'Blog',
    });
    return Blog;
};