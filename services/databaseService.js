// databaseService.js

// Utility function to handle errors
const handleError = (error) => {
    console.error(error);
    return { error: 'An error occurred while processing your request.' };
};

// Create a record
const createRecord = async (model, data) => {
    try {
        const record = await model.create(data);
        return { data: record };
    } catch (error) {
        return handleError(error);
    }
};

// Find all records
const findAllRecords = async (model) => {
    try {
        const records = await model.findAll();
        return { data: records };
    } catch (error) {
        return handleError(error);
    }
};

// Find a single record
const findOneRecord = async (model, id, columnName = null) => {
    try {
        // Validate the id
        if (id === undefined || id === null) {
            return { error: 'Id must be provided' };
        }

        // Ensure id is of the expected type
        if (typeof id !== 'string' && typeof id !== 'number') {
            return { error: 'Id must be a string or number' };
        }

        let record;
        console.log("Searching with Id and Column:", id, columnName);

        if (columnName) {
            // Validate the columnName
            if (typeof columnName !== 'string') {
                return { error: 'Column name must be a string' };
            }

            // Find a single record matching the specified column value
            record = await model.findOne({ where: { [columnName]: id } });
        } else {
            // Find by primary key
            record = await model.findByPk(id);
        }

        if (record) {
            return { data: record };
        } else {
            return { error: `Record not found${columnName ? ` in column: ${columnName}` : ''}` };
        }
    } catch (error) {
        return handleError(error);
    }
};

// Update a record by ID
const updateRecord = async (model, id, data) => {
    try {
        const [updated] = await model.update(data, { where: { id } });
        if (!updated) {
            return { error: 'Record not found or no changes made' };
        }
        const updatedRecord = await model.findByPk(id);
        return { data: updatedRecord };
    } catch (error) {
        return handleError(error);
    }
};

// Delete a record by ID
const deleteRecord = async (model, id) => {
    try {
        const deleted = await model.destroy({ where: { id } });
        if (!deleted) {
            return { error: 'Record not found' };
        }
        return { data: { message: 'Record deleted successfully' } };
    } catch (error) {
        return handleError(error);
    }
};

// Export functions for CRUD operations
module.exports = {
    createRecord,
    findAllRecords,
    findOneRecord,
    updateRecord,
    deleteRecord,
};
