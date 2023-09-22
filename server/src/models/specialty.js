'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {

        static associate(models) {
            // define association here
            Specialty.belongsTo(models.Allcode, { foreignKey: 'servicesId', targetKey: 'key_map', as: 'servicesData' })
            Specialty.hasMany(models.Doctor_Infor, { foreignKey: 'specialtyId' })
            Specialty.hasMany(models.Blog, { foreignKey: 'specialtyId' })
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
        tableName: 'Specialty',
    });
    return Specialty;
};