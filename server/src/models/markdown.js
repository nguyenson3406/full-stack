'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {

        static associate(models) {
            // define association here
        }
    };
    Markdown.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        blogId: DataTypes.INTEGER,
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};