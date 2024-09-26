const { MasterFirmModel } = require('../Models/index'); ; 
const { v4: uuidv4 } = require("uuid");


// List all firms 
exports.getFirms = async (req, res) => {
    try {
        const firms = await MasterFirmModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all firms  data successfully.",firms);

        return res.render("dashboard/firms/index", {
            title: "firms ",
        });
    } catch (error) {
        console.error("Error fetching firms  data:", error);
        return res.status(500).send({
            message: "Failed to retrieve firms data. Please try again later.",
        });
    }
};

// List all firms  (API)
exports.getFirmsApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getFirmsApi");

    try {
        // Fetch all firms from the database
        const firms = await MasterFirmModel.findAll();
        
        // Debugging: Log the number of firms fetched
        console.log(`Fetched ${firms.length} firms  successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "firms  retrieved successfully", 
            data: firms
        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getFirmsApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve firms . Please try again later.", 
            error: error.message 
        });
    }
};



// Create a new firms 
exports.createFirmsApi = async (req, res) => {
    try {
        // Extract firms  data from request body
        // const { firmsName } = req.body; 
     

        // Prepare the resolved data
        const resolvedData = { 
            firmId:uuidv4().replace(/-/g, ''),
            firmName: "Creelify", 
            address: "Near Church Daurala Meerut",
            pincode:"250221",
            GSTNumber:"27ABCDE1234F1Z5",
            accountNumber:"33916951373",
            bankName:"State bank Of India",
            IFSCcode:"SBIN0010652",
            productProduced: "Coal",
            quantity:"10",

        };

        // Create a new firms 
        const newFirms = await MasterFirmModel.create(resolvedData);

        // Log successful firms   creation
        console.log("Created new firms successfully:", newFirms);

        return res.status(201).send({
            success: true,
            message: "firms created successfully.",
            data: newFirms,
        });
    } catch (error) {
        console.error("Error creating firms :", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create firms . Please try again later.",
            error: error.message, 
        });
    }
};

// Delete an firm by ID
exports.deleteFirmApi = async (req, res) => {
    try {
        // Extract firm ID from request parameters
        const { id } = req.params;

        // Check if the firm exists before attempting to delete
        const firm = await MasterFirmModel.findByPk(id);
        if (!firm) {
            return res.status(404).send({
                success: false,
                message: "Firm not found.",
            });
        }

        // Delete the firm
        await firm.destroy();

        // Log successful firm deletion
        console.log("Deleted firm successfully:", firm);

        return res.status(200).send({
            success: true,
            message: "Firm deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting firm:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete firm. Please try again later.",
            error: error.message,
        });
    }
};