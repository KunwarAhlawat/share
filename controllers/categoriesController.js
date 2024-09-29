const { MasterCategoriesModel, MasterCustomerModel } = require('../Models/index'); 
const { v4: uuidv4 } = require("uuid"); 

// Controller Function: List all categories
exports.getCategories = async (req, res) => {
    try {
        const customers = await MasterCustomerModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all customers data successfully.",customers);

        return res.render("dashboard/categories/index", {
            title: "Categories",
            customers
        });
    } catch (error) {
        console.error("Error fetching Category data:", error);
        return res.status(500).send({
            message: "Failed to retrieve Category data. Please try again later.",
        });
    }
};

// Controller Function:  List all categories (API)
exports.getCategoriesApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getCategoriesApi");

    try {
        // Fetch all categories from the database
        const categories = await MasterCategoriesModel.findAll({
            include: [{
                model: MasterCustomerModel,
                as: 'customers'  // Ensure that this matches the alias defined in your association
            }]
        });
        
        
        // Debugging: Log the number of categories fetched
        console.log(`Fetched ${categories.length} categories successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "Categories retrieved successfully", 
             data: categories,

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

// Controller Function: Get one categories (API)
exports.getOneCategoryApi = async (req, res) => {
    console.log("Request received at getOneCategoryApi");

    try {
        const categoryId = req.params.id; 

        // Fetch the category and include related customers
        const category = await MasterCategoriesModel.findOne({
            where: { categoryId: categoryId },
            include: [{
                model: MasterCustomerModel,
                as: 'customers'  // Ensure that this matches the alias defined in your association
            }]
        });

        // Check if the category exists
        if (!category) {
            return res.status(404).json({ 
                success: false, 
                message: "Category not found." 
            });
        }

        console.log(`Category with ID ${categoryId} retrieved successfully.`, category); 
    

        // Send the response with the data (category and its customers)
        return res.status(200).json({ 
            success: true, 
            message: "Category retrieved successfully.", 
            data: category 
        });

    } catch (error) {
        console.error("Error occurred in getOneCategoryApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve category. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Create a new categories (API)
exports.createCategoryApi = async (req, res) => {
    console.log("createCategoryApi is requested", req.body); 

    try {
  
        const { category_name, customer_ids } = req.body; 

        // Check if the category with the same name  already exists
        const foundCategory = await MasterCategoriesModel.findOne({
            where: { categoryName: category_name } });

        // If found, return an error response
        if (foundCategory) {
         
       const errorMessage = foundCategory.categoryName === category_name ? "category-found" : "not-found";
            return res.status(400).send({
                success: false,
                message: errorMessage,
            });
        }

        // Prepare the resolved data for insertion
        const resolvedData = {
            categoryId: uuidv4().replace(/-/g, ''),
            categoryName:category_name
        };

        // Create the new category
        const newCategory = await MasterCategoriesModel.create(resolvedData);

        // Check if customers are provided and associate them with the category
        if (customer_ids && customer_ids.length > 0) {
            await newCategory.setCustomers(customer_ids); 
        }

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
            error: error.message,
        });
    }
};

// Controller Function: Update an existing categories (API)
exports.updateCategoryApi = async (req, res) => {
    console.log("updateCategoryApi is requested", req.body);

    try {
        const { edit_category_name, edit_customer_ids } = req.body;

        // Find the category to be updated by ID
        const category = await MasterCategoriesModel.findByPk(req.params.id);

        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found.",
            });
        }

   

        // Prepare the updated data
        const updatedData = {
            categoryId:req.params.id,
           categoryName:edit_category_name
        };

        // Update the category details
        await category.update(updatedData);

        // Check if customer IDs are provided and update the associations
        if (edit_customer_ids && edit_customer_ids.length > 0) {
            await category.setCustomers(edit_customer_ids);
        } else {
            // If no customers are provided, clear the existing associations
            await category.setCustomers([]);
        }

        // Log successful category update
        console.log("Updated category successfully:", category);

        return res.status(200).send({
            success: true,
            message: "Category updated successfully.",
            data: category,
        });
    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to update category. Please try again later.",
            error: error.message,
        });
    }
};


// Delete an categories by ID
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