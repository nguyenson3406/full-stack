'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {

        static associate(models) {
            // define association here
        }
    };
    Specialty.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.BLOB('long'),
        servicesId: DataTypes.STRING,
        show: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Specialty',
    });
    return Specialty;
};