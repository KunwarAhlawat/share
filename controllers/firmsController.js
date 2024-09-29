const { MasterFirmModel ,MasterCustomerModel} = require('../Models/index'); ; 
const { v4: uuidv4 } = require("uuid");
const { Op } = require('sequelize');

// Controller Function: List all firms
exports.getFirms = async (req, res) => {
    try {
        const customers = await MasterCustomerModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all customers data successfully.");

        return res.render("dashboard/firms/index", {
            title: "Firms",
            customers
        });
    } catch (error) {
        console.error("Error fetching firms data:", error);
        return res.status(500).send({
            message: "Failed to retrieve firms data. Please try again later.",
        });
    }
};


// Controller Function: List all firms (API)
exports.getFirmsApi = async (req, res) => {
    console.log("Request received at getFirmsApi");

    try {
        // Fetch all firms from the database
        const firms = await MasterFirmModel.findAll({
            include: [{
                model: MasterCustomerModel, 
                as: 'customers'  // Ensure this alias matches your associations
            }]
        });

        console.log(`Fetched ${firms.length} firms successfully from the API.`);
        
        return res.status(200).json({ 
            success: true, 
            message: "Firms retrieved successfully", 
            data: firms,
        });

    } catch (error) {
        console.error("Error occurred in getFirmsApi:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve firms. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Get one firm (API)
exports.getOneFirmApi = async (req, res) => {
    console.log("Request received at getOneFirmApi");

    try {
        const firmId = req.params.id;

        // Fetch the firm and include related customers
        const firm = await MasterFirmModel.findOne({
            where: { firmId: firmId },
            include: [{
                model: MasterCustomerModel,
                as: 'customers'  // Ensure this alias matches your associations
            }]
        });

        if (!firm) {
            return res.status(404).json({ 
                success: false, 
                message: "Firm not found." 
            });
        }

        console.log(`Firm with ID ${firmId} retrieved successfully.`);
        return res.status(200).json({ 
            success: true, 
            message: "Firm retrieved successfully.", 
            data: firm 
        });

    } catch (error) {
        console.error("Error occurred in getOneFirmApi:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve firm. Please try again later.", 
            error: error.message 
        });
    }
};


// Controller Function: Create a new firm (API)
exports.createFirmApi = async (req, res) => {
    console.log("CreateFirmApi is requested", req.body);

    try {
        const { firm_name, firm_gst_number, firm_address, firm_pincode,
            firm_account_number,firm_bank_name,firm_ifsc_code, firm_product_produced, 
            firm_quantity, customer_ids } = req.body;

     // Check if the firm with the same name, GST number, or account number already exists
const foundData = await MasterFirmModel.findOne({
    where: {
        [Op.or]: [
            { firmName: firm_name },
            { GSTNumber: firm_gst_number },
            { accountNumber: firm_account_number }
        ]
    }
});

if (foundData) {
    let errorMessage = '';

    if (foundData.firmName === firm_name) {
        errorMessage = "firm-name-found";
    } else if (foundData.GSTNumber === firm_gst_number) {
        errorMessage = "gst-number-found";
    } else if (foundData.accountNumber === firm_account_number) {
        errorMessage = "account-number-found";
    }

    return res.status(400).send({
        success: false,
        message: errorMessage,
    });
}


        // Prepare data for the new firm
        const resolvedData = {
            firmId:uuidv4().replace(/-/g, ''),
            firmName: firm_name,
            GSTNumber:firm_gst_number,
            address:firm_address || null,
            pincode:firm_pincode || null,
            accountNumber:firm_account_number,
            bankName:firm_bank_name || null,
            IFSCcode:firm_ifsc_code || null,
            productProduced:firm_product_produced || null,
            quantity:  firm_quantity || null,
 
        };

        // Create the new firm
        const newFirm = await MasterFirmModel.create(resolvedData);

        // Associate customers if provided
        if (customer_ids && customer_ids.length > 0) {
            await newFirm.setCustomers(customer_ids);
        }

        console.log("Created new firm successfully:", newFirm);

        return res.status(201).send({
            success: true,
            message: "Firm created successfully.",
            data: newFirm,
        });
    } catch (error) {
        console.error("Error creating firm:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create firm. Please try again later.",
            error: error.message,
        });
    }
};

// Controller Function: Update an existing firm (API)
exports.updateFirmApi = async (req, res) => {
    console.log("UpdateFirmApi is requested", req.body);

    try {
        const { edit_firm_name, edit_firm_gst_number, edit_firm_address, edit_firm_pincode,
            edit_firm_account_number,edit_firm_bank_name,edit_firm_ifsc_code, edit_firm_product_produced, 
            edit_firm_quantity, edit_customer_ids } = req.body;

        // Find the firm to update by ID
        const firm = await MasterFirmModel.findByPk(req.params.id);

        if (!firm) {
            console.log("Firm Not FOund+++++++++++++++++++++++++++++++")
            return res.status(404).send({
                success: false,
                message: "Firm not found.",
            });
        }

        // Prepare updated data
        const updatedData = {
            firmId:req.params.id,
            firmName: edit_firm_name,
            GSTNumber:edit_firm_gst_number,
            address:edit_firm_address ,
            pincode:edit_firm_pincode ,
            accountNumber:edit_firm_account_number,
            bankName:edit_firm_bank_name ,
            IFSCcode:edit_firm_ifsc_code ,
            productProduced:edit_firm_product_produced ,
            quantity:  edit_firm_quantity ,
        };

        // Update firm details
        await firm.update(updatedData);

        // Update customer associations if provided
        if (edit_customer_ids && edit_customer_ids.length > 0) {
            await firm.setCustomers(edit_customer_ids);
        } else {
            await firm.setCustomers([]); // Clear associations if no customers are provided
        }

        console.log("Updated firm successfully:", firm);

        return res.status(200).send({
            success: true,
            message: "Firm updated successfully.",
            data: firm,
        });
    } catch (error) {
        console.error("Error updating firm:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to update firm. Please try again later.",
            error: error.message,
        });
    }
};

// Controller Function: Delete a firm by ID (API)
exports.deleteFirmApi = async (req, res) => {
    try {
        const { id } = req.params;

        const firm = await MasterFirmModel.findByPk(id);

        if (!firm) {
            return res.status(404).send({
                success: false,
                message: "Firm not found.",
            });
        }

        await firm.destroy();

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
