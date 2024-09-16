// Universal Controller Template for CRUD Operations in Node.js with Express and Sequelize

const { Op } = require('sequelize');

// Generic CRUD Controller
class CrudController {
    constructor(model) {
        this.model = model;
        
    }
      
    // Create a new record
    create = async (req, res) => {
        try {
            const record = await this.model.create(req.body);
           
            res.status(201).json(record);
        } catch (error) {
            res.status(400).json({ message: 'Error creating record', error });
        }
    };

    // Retrieve all records
    findAll = async (req, res) => {
        try {
            const records = await this.model.findAll();
           
            res.status(200).json(records);
            console.log("hhhhhhhh",JSON.stringify(records));
        } catch (error) {
            res.status(400).json({ message: 'Error fetching records', error });
        }
    };

    // Retrieve a single record by ID
    findOne = async (req, res) => {
        try {
            const { id } = req.params;
            const record = await this.model.findByPk(id);
            if (record) {
                res.status(200).json(record);
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error fetching record', error });
        }
    };

    // Update a record by ID
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await this.model.update(req.body, { where: { id } });
            if (updated) {
                const updatedRecord = await this.model.findByPk(id);
                res.status(200).json(updatedRecord);
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error updating record', error });
        }
    };

    // Delete a record by ID
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await this.model.destroy({ where: { id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Record not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error deleting record', error });
        }
    };

}

module.exports = CrudController;
