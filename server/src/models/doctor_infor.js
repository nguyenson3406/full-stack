'use strict';
const {
    Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Infor extends Model {

        static associate(models) {
            // define association here
        }
    };
    Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        note: DataTypes.TEXT,
        count: DataTypes.INTEGER,
        show: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
    });
    return Doctor_Infor;
};