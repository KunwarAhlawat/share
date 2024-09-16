// 'use strict';

// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         await queryInterface.changeColumn('master_employees', 'dateOfLeaving', {
//             type: Sequelize.DATE,
//             allowNull: true,
//             defaultValue: null // Ensure defaultValue is set to null if no default is required
//         });
//     },

//     down: async (queryInterface, Sequelize) => {
//         await queryInterface.changeColumn('master_employees', 'dateOfLeaving', {
//             type: Sequelize.STRING(50),
//             allowNull: true,
//             defaultValue: "" // Restore the original default value if needed
//         });
//     }
// };
