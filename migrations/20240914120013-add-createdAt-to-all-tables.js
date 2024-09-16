'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Retrieve all table names
    const tables = await queryInterface.showAllTables();

    // Add or update createdAt and updatedAt columns in each table
    for (const table of tables) {
      try {
        // Check if the columns already exist
        const columns = await queryInterface.describeTable(table);
        const columnsToAdd = {};

        // Prepare column definitions
        if (!columns.createdAt) {
          columnsToAdd.createdAt = {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
          };
        }
        if (!columns.updatedAt) {
          columnsToAdd.updatedAt = {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            allowNull: false,
          };
        }

        // Add the columns if they don't exist
        if (Object.keys(columnsToAdd).length > 0) {
          for (const [column, definition] of Object.entries(columnsToAdd)) {
            await queryInterface.addColumn(table, column, definition);
          }
          console.log(`Added columns ${Object.keys(columnsToAdd).join(', ')} to ${table}`);
        } else {
          console.log(`Columns 'createdAt' and 'updatedAt' already exist in ${table}`);
        }
      } catch (error) {
        console.error(`Error processing table ${table}:`, error);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Retrieve all table names
    const tables = await queryInterface.showAllTables();

    // Remove createdAt and updatedAt columns from each table
    for (const table of tables) {
      try {
        // Check if the columns exist before attempting to remove them
        const columns = await queryInterface.describeTable(table);
        const columnsToRemove = [];

        if (columns.createdAt) columnsToRemove.push('createdAt');
        if (columns.updatedAt) columnsToRemove.push('updatedAt');

        if (columnsToRemove.length > 0) {
          for (const column of columnsToRemove) {
            await queryInterface.removeColumn(table, column);
          }
          console.log(`Removed columns ${columnsToRemove.join(', ')} from ${table}`);
        } else {
          console.log(`Columns 'createdAt' and 'updatedAt' do not exist in ${table}`);
        }
      } catch (error) {
        console.error(`Error removing columns from ${table}:`, error);
      }
    }
  }
};
