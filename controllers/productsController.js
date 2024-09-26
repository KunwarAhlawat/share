const { MasterProductsModel } = require('../Models/index'); ; 
const { v4: uuidv4 } = require("uuid");
// List all products 
exports.getProducts = async (req, res) => {
    try {
        const products = await MasterProductsModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all products  data successfully.",products);

        return res.render("dashboard/products/index", {
            title: "products ",
        });
    } catch (error) {
        console.error("Error fetching products  data:", error);
        return res.status(500).send({
            message: "Failed to retrieve products data. Please try again later.",
        });
    }
};

// List all products  (API)
exports.getProductsApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getProductsApi");

    try {
        // Fetch all products  from the database
        const products = await MasterProductsModel.findAll();
        
        // Debugging: Log the number of products fetched
        console.log(`Fetched ${products.length} products  successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "products  retrieved successfully", 
            data: products
        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getProductsApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve products . Please try again later.", 
            error: error.message 
        });
    }
};



// Create a new products 
exports.createProductsApi = async (req, res) => {
    try {
        // Extract products  data from request body
        // const { productsName } = req.body; 
     

        // Prepare the resolved data
        const resolvedData = { 
            productId:uuidv4().replace(/-/g, ''),
            productName: "Pig Iron", 
            productGroup: "Pig Iron Groups"
        };

        // Create a new products 
        const newProducts = await MasterProductsModel.create(resolvedData);

        // Log successful products   creation
        console.log("Created new products successfully:", newProducts);

        return res.status(201).send({
            success: true,
            message: "products created successfully.",
            data: newProducts,
        });
    } catch (error) {
        console.error("Error creating products :", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create products . Please try again later.",
            error: error.message, 
        });
    }
};

// Delete an product by ID
exports.deleteProductApi = async (req, res) => {
    try {
        // Extract product ID from request parameters
        const { id } = req.params;

        // Check if the product exists before attempting to delete
        const product = await MasterProductsModel.findByPk(id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found.",
            });
        }

        // Delete the product
        await product.destroy();

        // Log successful product deletion
        console.log("Deleted product successfully:", product);

        return res.status(200).send({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete product. Please try again later.",
            error: error.message,
        });
    }
};
