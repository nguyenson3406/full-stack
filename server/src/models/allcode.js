'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {

        static associate(models) {
            // define association here
            Allcode.hasMany(models.User, { foreignKey: 'positionId', sourceKey: 'key' })
            Allcode.hasMany(models.User, { foreignKey: 'roleId', sourceKey: 'key' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', sourceKey: 'key' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'priceId', sourceKey: 'key' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'provinceId', sourceKey: 'key' })
            Allcode.hasMany(models.Doctor_Infor, { foreignKey: 'paymentId', sourceKey: 'key' })
        }
    };
    Allcode.init({
        key: DataTypes.STRING,
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