const { MasterProductsModel , MasterCustomerModel, MasterProductGroupsModel} = require('../Models/index'); ; 
const { v4: uuidv4 } = require("uuid");
// Controller Function: List all products 
exports.getProducts = async (req, res) => {
    try {
        const customers = await MasterCustomerModel.findAll();
        const productGroups = await MasterProductGroupsModel.findAll();
        console.log("Fetched all customers  data successfully.");

        return res.render("dashboard/products/index", {
            title: "products ",
            customers,
            productGroups
        });
    } catch (error) {
        console.error("Error fetching products  data:", error);
        return res.status(500).send({
            message: "Failed to retrieve products data. Please try again later.",
        });
    }
};

// Controller Function: List all products (API)
exports.getProductsApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getProductsApi");

    try {
        // Fetch all products from the database with associated customers and product groups
        const products = await MasterProductsModel.findAll({
            include: [
                {
                    model: MasterCustomerModel,
                    as: 'customers',  // Matches alias in the association
                    through: { attributes: [] }, // This omits the junction table data
                    required: false  // Ensures products without customers are still included
                },
                {
                    model: MasterProductGroupsModel,
                    as: 'productGroups',  // Matches alias in the association (fix: from 'productGroups' to 'productGroup')
                    required: false  // Ensures products without a product group are still included
                }
            ]
        });
        
        // Debugging: Log the number of products fetched
        console.log(`Fetched ${products.length} products successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "Products retrieved successfully", 
            data: products
        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getProductsApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve products. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Get one product (API)
exports.getOneProductApi = async (req, res) => {
    console.log("Request received at getOneProductApi");

    try {
        const productId = req.params.id; 

        // Fetch the product and include related customers
        const product = await MasterProductsModel.findOne({
            where: { productId: productId },
            include: [
                {
                    model: MasterCustomerModel,
                    as: 'customers'  // Ensure this matches the alias defined in your association
                },
                {
                    model: MasterProductGroupsModel,
                    as: 'productGroups'  // Wrap alias in quotes
                }
            ]
        });
        

        // Check if the area exists
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found." 
            });
        }

        console.log(`Product with ID ${productId} retrieved successfully.`, product); 

        // Send the response with the data (product and its customers)
        return res.status(200).json({ 
            success: true, 
            message: "Product retrieved successfully.", 
            data: product 
        });

    } catch (error) {
        console.error("Error occurred in getOneProductApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve product. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Create a new product (API)
exports.createProductApi = async (req, res) => {
    console.log("CreateProductsApi is requested", req.body); 
    try {
        const { product_name, productGroup_ids, customer_ids } = req.body;

        // Check if the product with the same name exists
        const foundProduct = await MasterProductsModel.findOne({ where: { productName: product_name } });

        // If found, return an error response
        if (foundProduct) {
            const errorMessage = foundProduct.productName === product_name ? "product-found" : "not-found";
            return res.status(400).send({
                success: false,
                message: errorMessage,
            });
        }

        // Prepare the resolved data for insertion
        const resolvedData = {
            productId:uuidv4().replace(/-/g, ''),
            productName: product_name
        };

        // Create a new product
        const newProduct = await MasterProductsModel.create(resolvedData);

        // Check if customers are provided and associate them with the product
        if (customer_ids && Array.isArray(customer_ids) && customer_ids.length > 0) {
            await newProduct.setMasterCustomers(customer_ids);  // Associates customers with the product
        }

        // Check if product groups are provided and associate them with the product
        if (productGroup_ids) {
           newProduct.productGroupId =Number(productGroup_ids);
           await newProduct.save(); 
        }

        // Log successful product creation
        console.log("Created new product successfully:", newProduct);

        return res.status(201).send({
            success: true,
            message: "Product created successfully.",
            data: newProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create product. Please try again later.",
            error: error.message, 
        });
    }
};

// Controller Function: Update an existing product (API)
exports.updateProductApi = async (req, res) => {
    console.log("updateProductApi is requested", req.body); 
    try {
        const { edit_product_name, edit_productGroup_ids, edit_customer_ids } = req.body;
          
        // Find the product to be updated by ID
        const product = await MasterProductsModel.findByPk(req.params.id);

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found.",
            });
        }

        // Prepare the updated data
        const updatedData = {
            productName: edit_product_name
        };

        // Update the product details
        await product.update(updatedData);

        // Check if customers are provided and associate them with the product
        if (edit_customer_ids && Array.isArray(edit_customer_ids) && edit_customer_ids.length > 0) {
            await product.setCustomers(edit_customer_ids);  // Associates customers with the product
        }

        // Check if product groups are provided and associate them with the product
        if (edit_productGroup_ids) {
            product.productGroupId = Number(edit_productGroup_ids);
            await product.save();  
        }

        console.log("Updated product successfully:", product);

        return res.status(200).send({
            success: true,
            message: "Product updated successfully.",
            data: product,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to update product. Please try again later.",
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
