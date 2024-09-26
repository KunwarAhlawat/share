const { MasterGradeModel } = require('../Models/index'); ; 

// List all grades
exports.getGrades = async (req, res) => {
    try {
        const grades = await MasterGradeModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all grade data successfully.",grades);

        return res.render("dashboard/grades/index", {
            title: "grades",
        });
    } catch (error) {
        console.error("Error fetching grade data:", error);
        return res.status(500).send({
            message: "Failed to retrieve grade data. Please try again later.",
        });
    }
};

// List all grades (API)
exports.getGradesApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getGradesApi");

    try {
        // Fetch all grades from the database
        const grades = await MasterGradeModel.findAll();
        
        // Debugging: Log the number of grades fetched
        console.log(`Fetched ${grades.length} grades successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "grades retrieved successfully", 
            data: grades
        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getGradesApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve grades. Please try again later.", 
            error: error.message 
        });
    }
};



// Create a new grade
exports.createGradeApi = async (req, res) => {
    try {
        // Extract grade data from request body
        // const { gradeName } = req.body; 
     

        // Prepare the resolved data
        const resolvedData = { 
            gradeType: "AB", 
        };

        // Create a new grade
        const newGrade = await MasterGradeModel.create(resolvedData);

        // Log successful grade creation
        console.log("Created new grade successfully:", newGrade);

        return res.status(201).send({
            success: true,
            message: "grade created successfully.",
            data: newGrade,
        });
    } catch (error) {
        console.error("Error creating grade:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create grade. Please try again later.",
            error: error.message, 
        });
    }
};

// Delete an grade by ID
exports.deleteGradeApi = async (req, res) => {
    try {
        // Extract grade ID from request parameters
        const { id } = req.params;

        // Check if the grade exists before attempting to delete
        const grade = await MasterGradeModel.findByPk(Number(id));
        if (!grade) {
            return res.status(404).send({
                success: false,
                message: "Grade not found.",
            });
        }

        // Delete the grade
        await grade.destroy();

        // Log successful grade deletion
        console.log("Deleted grade successfully:", grade);

        return res.status(200).send({
            success: true,
            message: "Grade deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting grade:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete grade. Please try again later.",
            error: error.message,
        });
    }
};
