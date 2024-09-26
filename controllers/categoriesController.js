const { MasterCategoriesModel } = require('../Models/index'); 
const { v4: uuidv4 } = require("uuid"); 

// List all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await MasterCategoriesModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all category data successfully.",categories);

        return res.render("dashboard/categories/index", {
            title: "Categories",
        });
    } catch (error) {
        console.error("Error fetching Category data:", error);
        return res.status(500).send({
            message: "Failed to retrieve Category data. Please try again later.",
        });
    }
};

// List all categories (API)
exports.getCategoriesApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getCategoriesApi");

    try {
        // Fetch all categories from the database
        const categories = await MasterCategoriesModel.findAll();
        
        // Debugging: Log the number of categories fetched
        console.log(`Fetched ${categories.length} categories successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "Categories retrieved successfully", 
            data: categories
        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getCategoriesApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve categories. Please try again later.", 
            error: error.message 
        });
    }
};



// Create a new category
exports.createCategoryApi = async (req, res) => {
    try {
        // Extract category data from request body
        // const { categoryName } = req.body; 
     

        // Prepare the resolved data
        const resolvedData = {
            categoryId: uuidv4().replace(/-/g, ''), 
            categoryName: "Test Category", 
        };

        // Create a new category
        const newCategory = await MasterCategoriesModel.create(resolvedData);

        // Log successful category creation
        console.log("Created new category successfully:", newCategory);

        return res.status(201).send({
            success: true,
            message: "Category created successfully.",
            data: newCategory,
        });
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create category. Please try again later.",
            error: error.message, // Send only the error message for security
        });
    }
};

// Delete an category by ID
exports.deleteCategoryApi = async (req, res) => {
    try {
        // Extract category ID from request parameters
        const { id } = req.params;

        // Check if the category exists before attempting to delete
        const category = await MasterCategoriesModel.findByPk(id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found.",
            });
        }

        // Delete the category
        await category.destroy();

        // Log successful category deletion
        console.log("Deleted category successfully:", category);

        return res.status(200).send({
            success: true,
            message: "Category deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete category. Please try again later.",
            error: error.message,
        });
    }
};