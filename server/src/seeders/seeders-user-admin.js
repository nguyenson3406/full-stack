const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hashPassword = await bcrypt.hashSync('12345678', salt);
    let addAdmin = queryInterface.bulkInsert('Users', [{
      email: 'admin@testbooking.com',
      password: hashPassword,
      firstName: 'Admin',
      lastName: 'Admin',
      roleId: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    return addAdmin
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
