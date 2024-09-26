const { MasterProductGroupsModel } = require('../Models/index'); ; 

// List all product Groups
exports.getProductGroups = async (req, res) => {
    try {
        const productGroups = await MasterProductGroupsModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all product groups data successfully.",productGroups);

        return res.render("dashboard/productGroups/index", {
            title: "Product Groups",
        });
    } catch (error) {
        console.error("Error fetching product groups data:", error);
        return res.status(500).send({
            message: "Failed to retrieve product data. Please try again later.",
        });
    }
};

// List all product Groups (API)
exports.getProductGroupsApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getProductGroupsApi");

    try {
        // Fetch all product Groups from the database
        const productGroups = await MasterProductGroupsModel.findAll();
        
        // Debugging: Log the number of productGroups fetched
        console.log(`Fetched ${productGroups.length} product Groups successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "product Groups retrieved successfully", 
            data: productGroups
        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getProductGroupsApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve product Groups. Please try again later.", 
            error: error.message 
        });
    }
};



// Create a new product group
exports.createProductGroupApi = async (req, res) => {
    try {
        // Extract product group data from request body
        // const { productName } = req.body; 
     

        // Prepare the resolved data
        const resolvedData = { 
            productGroupName: "Pig Iron", 
        };

        // Create a new product group
        const newProduct = await MasterProductGroupsModel.create(resolvedData);

        // Log successful product  group creation
        console.log("Created new product successfully:", newProduct);

        return res.status(201).send({
            success: true,
            message: "product created successfully.",
            data: newProduct,
        });
    } catch (error) {
        console.error("Error creating product group:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create product group. Please try again later.",
            error: error.message, 
        });
    }
};

// Delete an product group by ID
exports.deleteProductGroupApi = async (req, res) => {
    try {
        // Extract product group ID from request parameters
        const { id } = req.params;

        // Check if the product group exists before attempting to delete
        const productGroup = await MasterProductGroupsModel.findByPk(Number(id));
        if (!productGroup) {
            return res.status(404).send({
                success: false,
                message: "Product Group not found.",
            });
        }

        // Delete the product group
        await productGroup.destroy();

        // Log successful product group deletion
        console.log("Deleted product group successfully:", productGroup);

        return res.status(200).send({
            success: true,
            message: "Product group deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting product group:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete product group. Please try again later.",
            error: error.message,
        });
    }
};
