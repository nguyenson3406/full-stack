'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {

        static associate(models) {
            // define association here
            Clinic.hasOne(models.Markdown, { foreignKey: 'clinicId' })
        }
    };
    Clinic.init({
        name: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        address: DataTypes.STRING,
        image: DataTypes.BLOB('long'),
        show: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Clinic',
        tableName: 'Clinic',
    });
    return Clinic;
};