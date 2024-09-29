const { MasterGradeModel , MasterCustomerModel} = require('../Models/index'); ; 

// List all grades
exports.getGrades = async (req, res) => {
    try {
        const customers = await MasterCustomerModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all customers data successfully.",customers);

        return res.render("dashboard/grades/index", {
            title: "Grades",
            customers
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
        const grades = await MasterGradeModel.findAll({
            include: [{
                model: MasterCustomerModel,
                as: 'customers'  // Ensure that this matches the alias defined in your association
            }]
        });
        
        
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


// Controller Function: Get one grade (API)
exports.getOneGradeApi = async (req, res) => {
    console.log("Request received at getOneGradeApi");

    try {
        const gradeId = Number(req.params.id);

        // Fetch the grade and include related customers
        const grade = await MasterGradeModel.findOne({
            where: { gradeId: gradeId },
            include: [{
                model: MasterCustomerModel,
                as: 'customers'  // Ensure that this matches the alias defined in your association
            }]
        });

        // Check if the grade exists
        if (!grade) {
            return res.status(404).json({ 
                success: false, 
                message: "grade not found." 
            });
        }

        console.log(`grade with ID ${gradeId} retrieved successfully.`, grade); 
        console.log("This is the grade with related customers:", grade);

        // Send the response with the data (grade and its customers)
        return res.status(200).json({ 
            success: true, 
            message: "grade retrieved successfully.", 
            data: grade 
        });

    } catch (error) {
        console.error("Error occurred in getOneGradeApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve grade. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Create a new grade (API)
exports.createGradeApi = async (req, res) => {
    console.log("createGradeApi is requested", req.body); 

    try {
  
        const { grade_name, customer_ids } = req.body; 

        // Check if the grade with the same name or zone already exists
        const foundGradeOrZone = await MasterGradeModel.findOne({ where:{ gradeType: grade_name } });

        // If found, return an error response
        if (foundGradeOrZone) {
  

            const errorMessage = foundGradeOrZone.gradeType === grade_name 
                ? "grade-found"
                : "Not-found";
            return res.status(400).send({
                success: false,
                message: errorMessage,
            });
        }

        // Prepare the resolved data for insertion
        const resolvedData = {
            gradeType: grade_name,
        };

        // Create the new grade
        const newGrade = await MasterGradeModel.create(resolvedData);

        // Check if customers are provided and associate them with the grade
        if (customer_ids && customer_ids.length > 0) {
            await newGrade.setCustomers(customer_ids); 
        }

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

// Controller Function: Update an existing grade (API)
exports.updateGradeApi = async (req, res) => {
    console.log("updateGradeApi is requested", req.body);

    try {
        const { edit_grade_name, edit_grade_district, edit_grade_zone, edit_state, edit_customer_ids } = req.body;

        // Find the grade to be updated by ID
        const grade = await MasterGradeModel.findByPk(Number(req.params.id));

        if (!grade) {
            return res.status(404).send({
                success: false,
                message: "grade not found.",
            });
        }

        // Check if another grade with the same name or zone already exists (excluding the current grade being updated)
        const foundGradeOrZone = await MasterGradeModel.findOne({
            where: {
                [Op.and]: [
                    { gradeId: { [Op.ne]: Number(req.params.id) } }, // Use gradeId instead of id
                    {
                        [Op.or]: [
                            { gradeName: edit_grade_name },
                            { zoneName: edit_grade_zone }
                        ]
                    }
                ]
            }
        });

        // If another grade with the same name or zone is found, return an error response
        if (foundGradeOrZone) {
            const errorMessage = foundGradeOrZone.gradeName === edit_grade_name
                ? "grade-found"
                : "zone-found";
            return res.status(400).send({
                success: false,
                message: errorMessage,
            });
        }

        // Prepare the updated data
        const updatedData = {
            gradeName: edit_grade_name,
            districtName: edit_grade_district,
            zoneName: edit_grade_zone,
            stateName: edit_state
        };

        // Update the grade details
        await grade.update(updatedData);

        // Check if customer IDs are provided and update the associations
        if (edit_customer_ids && edit_customer_ids.length > 0) {
            await grade.setCustomers(edit_customer_ids);
        } else {
            // If no customers are provided, clear the existing associations
            await grade.setCustomers([]);
        }

        // Log successful grade update
        console.log("Updated grade successfully:", grade);

        return res.status(200).send({
            success: true,
            message: "grade updated successfully.",
            data: grade,
        });
    } catch (error) {
        console.error("Error updating grade:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to update grade. Please try again later.",
            error: error.message,
        });
    }
};

// Delete an grade by ID (API)
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
