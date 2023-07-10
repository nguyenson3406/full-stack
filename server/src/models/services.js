'use strict';
const {
    Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Services extends Model {

        static associate(models) {
            // define association here
        }
    };
    Services.init({
        specialtyId: DataTypes.INTEGER,
        servicesId: DataTypes.STRING,
        show: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Services',
    });
    return Services;
};