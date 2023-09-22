'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.belongsTo(models.Allcode, { foreignKey: 'positionId', targetKey: 'key_map', as: 'positionData' })
      User.belongsTo(models.Allcode, { foreignKey: 'roleId', targetKey: 'key_map', as: 'roleData' })
      User.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'key_map', as: 'genderData' })
      User.hasOne(models.Markdown, { foreignKey: 'doctorId' })
      User.hasOne(models.Doctor_Infor, { foreignKey: 'doctorId' })
      User.hasMany(models.Schedule, { foreignKey: 'doctorId' })
      User.hasMany(models.Booking, { foreignKey: 'doctorId' })
      User.hasMany(models.Booking, { foreignKey: 'patientId' })
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    positionId: DataTypes.STRING,
    image: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};