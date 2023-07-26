const dataAllcode = require('./dataAllcode.json');

'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        let addAllcode = await dataAllcode.map((item, index) => {
            queryInterface.bulkInsert('Allcode', [
                {
                    id: index + 1, key: item.key, type: item.type, value_en: item.value_en, value_vi: item.value_vi, createdAt: new Date(), updatedAt: new Date()
                }
            ])
        });
        return addAllcode
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
