'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {

        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'positionId', sourceKey: 'key_map' })
            Allcode.hasMany(models.User, { foreignKey: 'roleId', sourceKey: 'key_map' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', sourceKey: 'key_map' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceId', sourceKey: 'key_map' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'provinceId', sourceKey: 'key_map' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentId', sourceKey: 'key_map' })
            Allcode.hasMany(models.Specialty, { foreignKey: 'servicesId', sourceKey: 'key_map' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'timeType', sourceKey: 'key_map' })
            Allcode.hasMany(models.Booking, { foreignKey: 'statusId', sourceKey: 'key_map' })
            Allcode.hasMany(models.Booking, { foreignKey: 'timeType', sourceKey: 'key_map' })
        }
    };
    Allcode.init({
        key_map: DataTypes.STRING,
        type: DataTypes.STRING,
        value_en: DataTypes.STRING,
        value_vi: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Allcode',
        tableName: 'Allcode',
    });
    return Allcode;
};