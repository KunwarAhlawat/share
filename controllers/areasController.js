const { MasterAreaModel, MasterCustomerModel  } = require('../Models/index'); ; 
const { Op, where } = require('sequelize');

// Controller Function: List all areas
exports.getAreas = async (req, res) => {
    try {
        const customers = await MasterCustomerModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all customers data successfully.");

        return res.render("dashboard/areas/index", {
            title: "areas",
            customers
        });
    } catch (error) {
        console.error("Error fetching area data:", error);
        return res.status(500).send({
            message: "Failed to retrieve area data. Please try again later.",
        });
    }
};

// Controller Function:  List all areas (API)
exports.getAreasApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getAreasApi");

    try {
        // Fetch all areas from the database
        const areas = await MasterAreaModel.findAll({
            include: [{
                model: MasterCustomerModel,
                as: 'customers'  // Ensure that this matches the alias defined in your association
            }]
        });
        
        
        // Debugging: Log the number of areas fetched
        console.log(`Fetched ${areas.length} areas successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "areas retrieved successfully", 
             data: areas,

        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getAreasApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve areas. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Get one area (API)
exports.getOneAreaApi = async (req, res) => {
    console.log("Request received at getOneAreaApi");

    try {
        const areaId = Number(req.params.id); 

        // Fetch the area and include related customers
        const area = await MasterAreaModel.findOne({
            where: { areaId: areaId },
            include: [{
                model: MasterCustomerModel,
                as: 'customers'  // Ensure that this matches the alias defined in your association
            }]
        });

        // Check if the area exists
        if (!area) {
            return res.status(404).json({ 
                success: false, 
                message: "Area not found." 
            });
        }

        console.log(`Area with ID ${areaId} retrieved successfully.`, area); 
        console.log("This is the area with related customers:", area);

        // Send the response with the data (area and its customers)
        return res.status(200).json({ 
            success: true, 
            message: "Area retrieved successfully.", 
            data: area 
        });

    } catch (error) {
        console.error("Error occurred in getOneAreaApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve area. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Create a new area (API)
exports.createAreaApi = async (req, res) => {
    console.log("CreateAreaApi is requested", req.body); 

    try {
  
        const { area_name, area_district, area_zone, state, customer_ids } = req.body; 

        // Check if the area with the same name or zone already exists
        const foundAreaOrZone = await MasterAreaModel.findOne({
            where: {
                [Op.or]: [
                    { areaName: area_name },
                    { zoneName: area_zone }
                ]
            }
        });

        // If found, return an error response
        if (foundAreaOrZone) {
            // const errorMessage = foundAreaOrZone.areaName === area_name 
            //     ? "Area with the same name already exists." 
            //     : "Zone with the same name already exists.";

            const errorMessage = foundAreaOrZone.areaName === area_name 
                ? "area-found"
                : "zone-found";
            return res.status(400).send({
                success: false,
                message: errorMessage,
            });
        }

        // Prepare the resolved data for insertion
        const resolvedData = {
            areaName: area_name,
            districtName: area_district,
            zoneName: area_zone,
            stateName: state
        };

        // Create the new area
        const newArea = await MasterAreaModel.create(resolvedData);

        // Check if customers are provided and associate them with the area
        if (customer_ids && customer_ids.length > 0) {
            await newArea.setCustomers(customer_ids); 
        }

        // Log successful area creation
        console.log("Created new area successfully:", newArea);

        return res.status(201).send({
            success: true,
            message: "Area created successfully.",
            data: newArea,
        });
    } catch (error) {
        console.error("Error creating area:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create area. Please try again later.",
            error: error.message,
        });
    }
};

// Controller Function: Update an existing area (API)
exports.updateAreaApi = async (req, res) => {
    console.log("UpdateAreaApi is requested", req.body);

    try {
        const { edit_area_name, edit_area_district, edit_area_zone, edit_state, edit_customer_ids } = req.body;

        // Find the area to be updated by ID
        const area = await MasterAreaModel.findByPk(Number(req.params.id));

        if (!area) {
            return res.status(404).send({
                success: false,
                message: "Area not found.",
            });
        }

   

        // Prepare the updated data
        const updatedData = {
            areaName: edit_area_name,
            districtName: edit_area_district,
            zoneName: edit_area_zone,
            stateName: edit_state
        };

        // Update the area details
        await area.update(updatedData);

        // Check if customer IDs are provided and update the associations
        if (edit_customer_ids && edit_customer_ids.length > 0) {
            await area.setCustomers(edit_customer_ids);
        } else {
            // If no customers are provided, clear the existing associations
            await area.setCustomers([]);
        }

        // Log successful area update
        console.log("Updated area successfully:", area);

        return res.status(200).send({
            success: true,
            message: "Area updated successfully.",
            data: area,
        });
    } catch (error) {
        console.error("Error updating area:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to update area. Please try again later.",
            error: error.message,
        });
    }
};

// Controller Function:Delete an area by ID (API)
exports.deleteAreaApi = async (req, res) => {
    try {
        // Extract area ID from request parameters
        const { id } = req.params;

        // Check if the area exists before attempting to delete
        const area = await MasterAreaModel.findByPk(Number(id));
        if (!area) {
            return res.status(404).send({
                success: false,
                message: "Area not found.",
            });
        }

        // Delete the area
        await area.destroy();

        // Log successful area deletion
        console.log("Deleted area successfully:", area);

        return res.status(200).send({
            success: true,
            message: "Area deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting area:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete area. Please try again later.",
            error: error.message,
        });
    }
};
