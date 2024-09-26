// These are the helper functions

const handleSequelizeErrors = (error) => {
    if (error.name === 'SequelizeValidationError') {
        console.log("I am Kunwar Ahlawat", error.errors.map(err => err.message + err.path));
        return {
            status: 400,
            message: 'Validation error.',
            details: error.errors.map(err => err.message),
        };
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
        return {
            status: 409,
            message: 'Unique constraint error.',
            details: error.errors.map(err => err.message),
        };
    }

    // Handle other types of database errors if needed
    return {
        status: 500,
        message: 'An unexpected error occurred.',
        details: [],
    };
};

// Export the function
module.exports = {
    handleSequelizeErrors,
};

