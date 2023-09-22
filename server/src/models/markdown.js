'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {

        static associate(models) {
            // define association here
            Markdown.belongsTo(models.User, { foreignKey: 'doctorId', as: 'DoctorMarkdownData' })
            Markdown.belongsTo(models.Clinic, { foreignKey: 'clinicId', as: 'ClinicMarkdownData' })
            Markdown.belongsTo(models.Blog, { foreignKey: 'blogId', as: 'BlogMarkdownData' })
        }
    };
    Markdown.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        blogId: DataTypes.INTEGER,
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Markdown',
        tableName: 'Markdown',
    });
    return Markdown;
};