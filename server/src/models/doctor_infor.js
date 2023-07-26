'use strict';
const {
    Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Infor extends Model {

        static associate(models) {
            // define association here
            Doctor_Infor.belongsTo(models.User, { foreignKey: 'doctorId', as: 'DoctorInforData' })
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'key', as: 'priceData' })
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'key', as: 'provinceData' })
            Doctor_Infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'key', as: 'paymentData' })
        }
    };
    Doctor_Infor.init({
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        note: DataTypes.TEXT,
        count: DataTypes.INTEGER,
        show: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Doctor_Infor',
        tableName: 'Doctor_Infor',
    });
    return Doctor_Infor;
};