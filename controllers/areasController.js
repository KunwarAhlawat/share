const { MasterAreaModel } = require('../Models/index'); 
const { v4: uuidv4 } = require("uuid"); 
const validator = require('validator');

// Create a new area
exports.createArea = async (req, res) => {
   
    // debug
    console.log("req.body-createArea",req.body)
    const {
        area_name,
        district,
        zone = '',
        state ,
    } = req.body;

     // Validate required fields
     if (!validator.isAlpha(area_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid area name');
    }
    if (!validator.isAlpha(district.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid area name');
    }

  

    // Handle optional fields
    const sanitizedData = {
        
        area: validator.escape(area_name),
        district: validator.escape(district),
        zone: validator.isEmpty(zone) ? null : validator.escape(zone),
        state: validator.escape(state),
     
    };

    try {
        // check if area already exist
        const result = await MasterAreaModel.findOne({ where: { area: area_name } });
          
        // debug
        console.log("Result-Create Employee",result)
                if (result) {
                    res.status(409).json({ message: 'Area already exists' });
                    
                } else {
                    const area = await MasterAreaModel.create(sanitizedData);
                    res.status(201).json({ message: 'Area was created.' });
                }
         
        // const employee = await MasterEmployee.create(sanitizedData);
        // res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Read an area by id
// exports.getAreaById = async (req, res) => {
//     try {
//         const employee = await MasterAreaModel.findByPk(req.params.id);
//         if (employee) {
//             res.status(200).json(employee);
//         } else {
//             res.status(404).json({ message: 'Employee not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Update an area by id
exports.updateArea = async (req, res) => {
    // debug
    console.log("req.id-updateArea", typeof req.params.id);
    const id = Number(req.params.id);
    const {
        area_name,
        district,
        zone = '',
        state ,
    } = req.body;

      // Validate required fields
      if (!validator.isAlpha(area_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid area name');
    }
    if (!validator.isAlpha(district.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid area name');
    }

  

    // Handle optional fields
    const sanitizedData = {
        
        area: validator.escape(area_name),
        district: validator.escape(district),
        zone: validator.isEmpty(zone) ? null : validator.escape(zone),
        state: validator.escape(state),
     
    };

    try {
        const [updated] = await MasterAreaModel.update(sanitizedData, {
            where: { areaId : id }
        });
        if (updated) {
            const updatedArea = await MasterAreaModel.findByPk(id);
            res.status(200).json(updatedArea);
        } else {
            res.status(404).json({ message: 'Area not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete an area by id
exports.deleteArea = async (req, res) => {
      // debug
      console.log("req.id-deleteArea", typeof req.params.id);
    const id = Number(req.params.id);
    try {
        const deleted = await MasterAreaModel.destroy({
            where: { areaId: id}
        });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Area not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// list all area
exports.getAllArea = async (req, res) => {
    try {
        const area = await MasterAreaModel.findAll();
         
        // convert to plain array of object
        const resolvedData = area.map((item) => item.dataValues);
        
        // debug
        console.log("ResolvedData-getAllArea", resolvedData)
        res.render("dashboard/areas/index", {
            title: "All Area",
            data: resolvedData,
        });
        // res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
