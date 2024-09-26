const { MasterAreaModel, MasterCustomerModel  } = require('../Models/index'); ; 
const { Op } = require('sequelize');

// List all areas
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

// List all areas (API)
exports.getAreasApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getAreasApi");

    try {
        // Fetch all areas from the database
        const areas = await MasterAreaModel.findAll();
        
        
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



// Controller Function: Create a new area
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





// Delete an area by ID
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
