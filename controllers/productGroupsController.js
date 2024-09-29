const { MasterProductGroupsModel, MasterProductsModel } = require('../Models/index'); ; 

// List all product Groups
exports.getProductGroups = async (req, res) => {
    try {
        const products = await MasterProductsModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all product groups data successfully.",products);

        return res.render("dashboard/productGroups/index", {
            title: "Product Groups",
            products
        });
    } catch (error) {
        console.error("Error fetching product groups data:", error);
        return res.status(500).send({
            message: "Failed to retrieve product data. Please try again later.",
        });
    }
};

// Controller Function: List all product Groups (API)
exports.getProductGroupsApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getProductGroupsApi");

    try {
        // Fetch all product Groups from the database
        
        const productGroups = await MasterProductGroupsModel.findAll({
            include: [{
                model: MasterProductsModel,
                as: 'products'  // Ensure that this matches the alias defined in your association
            }]
        });
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

// Controller Function: Get one product group (API)
exports.getOneProductGroupApi = async (req, res) => {
    console.log("Request received at getOneProductApi");

    try {
        const productGroupId = Number(req.params.id); 

        // Fetch the product and include related customers
        const product = await MasterProductGroupsModel.findOne({
            where: { productGroupId: productGroupId },
            include: [{
                model: MasterProductsModel,
                as: 'products'  // Ensure that this matches the alias defined in your association
            }]
        });

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: "Area not found." 
            });
        }

        console.log(`Product with ID ${productGroupId} retrieved successfully.`, product); 
    

        // Send the response with the data 
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
exports.createProductGroupApi = async (req, res) => {
    console.log("createProductApi is requested", req.body); 

    try {
  
        const { product_group_name, product_ids } = req.body; 

        // Check if the product group name with the same name already exists
        const foundProductGroup = await MasterProductGroupsModel.findOne({
            where:{ productGroupName: product_group_name } } );

        // If found, return an error response
        if (foundProductGroup) {
            const errorMessage = foundProductGroup.productGroupName === product_group_name ? "product-group-found": "not-found";
            return res.status(400).send({
                success: false,
                message: errorMessage,
            });
        }

        // Prepare the resolved data for insertion
        const resolvedData = {
            productGroupName:product_group_name
        };

        // Create the new area
        const newProductGroup = await MasterProductGroupsModel.create(resolvedData);

        // Check if customers are provided and associate them with the area
        // if (customer_ids && customer_ids.length > 0) {
        //     await newArea.setCustomers(customer_ids); 
        // }

                // Check if products are provided and associate them with the area
                if (product_ids && product_ids.length > 0) {
                    await newProductGroup.setProducts(product_ids); 
                }
        

        // Log successful area creation
        console.log("Created new product successfully:", newProductGroup);

        return res.status(201).send({
            success: true,
            message: "Product created successfully.",
            data: newProductGroup,
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
exports.updateProductGroupApi = async (req, res) => {
    console.log("updateProductApi is requested", req.body);

    try {
        const { edit_product_group_name, edit_product_ids } = req.body;

        // Find the area to be updated by ID
        const productGroup = await MasterProductGroupsModel.findByPk(Number(req.params.id));

        if (!productGroup) {
            return res.status(404).send({
                success: false,
                message: "Product not found.",
            });
        }

   

        // Prepare the updated data
        const updatedData = {
            productGroupName:edit_product_group_name
        };

        // Update the area details
        await productGroup.update(updatedData);

        // Check if product IDs are provided and update the associations
        if (edit_product_ids && edit_product_ids.length > 0) {
            await productGroup.setProducts(edit_product_ids);
        } else {
            // If no product are provided, clear the existing associations
            await productGroup.setProducts([]);
        }

        // Log successful area update
        console.log("Updated product group successfully:", productGroup);

        return res.status(200).send({
            success: true,
            message: "Product Group updated successfully.",
            data: productGroup,
        });
    } catch (error) {
        console.error("Error updating product group:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to update product group. Please try again later.",
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
