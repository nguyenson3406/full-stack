'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {

        static associate(models) {
            // define association here
            Schedule.belongsTo(models.User, { foreignKey: 'doctorId', as: 'ScheduleData' })
            Schedule.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'key_map', as: 'timeData' })
        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
        timeType: DataTypes.STRING,
        doctorId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schedule',
        tableName: 'Schedule',
    });
    return Schedule;
};