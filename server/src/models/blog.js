'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Blog extends Model {

        static associate(models) {
            // define association here
        }
    };
    Blog.init({
        name: DataTypes.STRING,
        author: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.BLOB('long'),
        show: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};