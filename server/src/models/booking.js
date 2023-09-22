'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {

        static associate(models) {
            // define association here
            Booking.belongsTo(models.Allcode, { foreignKey: 'statusId', targetKey: 'key_map', as: 'statusData' })
            Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'key_map', as: 'timeData' })
            Booking.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctorData' })
            Booking.belongsTo(models.User, { foreignKey: 'patientId', as: 'patientData' })
        }
    };
    Booking.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientId: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
        timeType: DataTypes.STRING,
        token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
        tableName: 'Booking',
    });
    return Booking;
};