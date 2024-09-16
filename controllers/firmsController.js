const { MasterFirmModel } = require('../Models/index'); 
const { v4: uuidv4 } = require("uuid"); 
const validator = require('validator');

// Create a new firm
exports.createFirm = async (req, res) => {
   
    // debug
    console.log("req.body-createFirm",req.body)
    const {
        firm_name,
        firm_address,
        firm_pincode,
        product_produced = '',
        product_quantity = '',
        gst_number = '',
        account_number = '',
        bank_name = '',
        ifsc_code = '',
    } = req.body;

     // Validate required fields
     if (!validator.isAlpha(firm_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid Firm name');
    }
    if (!validator.isAlpha(firm_address.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid Firm address');
    }

    if (firm_pincode && typeof firm_pincode === 'string') {
        if (!validator.isNumeric(firm_pincode.replace(/\s/g, ''))) {
            return res.status(400).send('Invalid Firm pincode');
        }
    } else {
        return res.status(400).send('Firm pincode is required and must be a string');
    }
    


  

    // Handle optional fields
    const sanitizedData = {
        firmId: uuidv4(),
        firmName: validator.escape(firm_name),
        address: validator.escape(firm_address),
        pincode: validator.escape(firm_pincode),
        GSTNumber: validator.isEmpty(gst_number) ? null : validator.escape(gst_number),
        accountNumber: validator.isEmpty(account_number) ? null : validator.escape(account_number),
        bankName: validator.isEmpty(bank_name) ? null : validator.escape(bank_name),
        IFSCcode: validator.isEmpty(ifsc_code) ? null : validator.escape(ifsc_code),
        ProductProduced: validator.isEmpty(product_produced) ? null : validator.escape(product_produced),
        Quantity: validator.isEmpty(product_quantity) ? null : validator.escape(product_quantity),
       
     
    };

    try {
        // check if Firm already exist
        const result = await MasterFirmModel.findOne({ where: { firmName: firm_name } });
          
        // debug
        console.log("Result-Create Employee",result)
                if (result) {
                    res.status(409).json({ message: 'Firm already exists' });
                    
                } else {
                    const Firm = await MasterFirmModel.create(sanitizedData);
                    res.status(201).json({ message: 'Firm was created.' });
                }
         
        // const employee = await MasterEmployee.create(sanitizedData);
        // res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Read an Firm by id
// exports.getFirmById = async (req, res) => {
//     try {
//         const employee = await MasterFirmModel.findByPk(req.params.id);
//         if (employee) {
//             res.status(200).json(employee);
//         } else {
//             res.status(404).json({ message: 'Employee not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Update an Firm by id
exports.updateFirm = async (req, res) => {
    // debug
    console.log("req.body-createFirm",req.body)
    const {
        firm_name,
        firm_address,
        firm_pincode,
        product_produced = '',
        product_quantity = '',
        gst_number = '',
        account_number = '',
        bank_name = '',
        ifsc_code = '',
    } = req.body;

     // Validate required fields
     if (!validator.isAlpha(firm_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid Firm name');
    }
    if (!validator.isAlpha(firm_address.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid Firm address');
    }

    if (firm_pincode && typeof firm_pincode === 'string') {
        if (!validator.isNumeric(firm_pincode.replace(/\s/g, ''))) {
            return res.status(400).send('Invalid Firm pincode');
        }
    } else {
        return res.status(400).send('Firm pincode is required and must be a string');
    }
    


  

    // Handle optional fields
    const sanitizedData = {
        firmId: req.params.id,
        firmName: validator.escape(firm_name),
        address: validator.escape(firm_address),
        pincode: validator.escape(firm_pincode),
        GSTNumber: validator.isEmpty(gst_number) ? null : validator.escape(gst_number),
        accountNumber: validator.isEmpty(account_number) ? null : validator.escape(account_number),
        bankName: validator.isEmpty(bank_name) ? null : validator.escape(bank_name),
        IFSCcode: validator.isEmpty(ifsc_code) ? null : validator.escape(ifsc_code),
        ProductProduced: validator.isEmpty(product_produced) ? null : validator.escape(product_produced),
        Quantity: validator.isEmpty(product_quantity) ? null : validator.escape(product_quantity),
       
     
    };

    try {
        const [updated] = await MasterFirmModel.update(sanitizedData, {
            where: { firmId : req.params.id }
        });
        if (updated) {
            const updatedFirm = await MasterFirmModel.findByPk(req.params.id);
            res.status(200).json(updatedFirm);
        } else {
            res.status(404).json({ message: 'Firm not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete an Firm by id
exports.deleteFirm = async (req, res) => {
      // debug
      console.log("req.id-deleteFirm", typeof req.params.id);
    // const id = Number(req.params.id);
    try {
        const deleted = await MasterFirmModel.destroy({
            where: { firmId: req.params.id}
        });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Firm not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// list all firm
exports.getAllFirm = async (req, res) => {
    try {
        const firm = await MasterFirmModel.findAll();
         
        // convert to plain array of object
        const resolvedData = firm.map((item) => item.dataValues);
        
        // debug
        console.log("ResolvedData-getAllFirm", resolvedData)
        res.render("dashboard/firms/index", {
            title: "All Firm",
            data: resolvedData,
        });
        // res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
