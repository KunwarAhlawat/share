const { MasterAreaModel } = require('../Models/index');
const validator = require('validator');

// Helper function to validate input fields
const validateAreaInput = (area_name, district) => {
  if (!validator.isAlpha(area_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
    return 'Invalid area name';
  }
  if (!validator.isAlpha(district.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
    return 'Invalid district name';
  }
  return null;
};

// Create a new area
exports.createArea = async (req, res) => {
  console.log("req.body-createArea", req.body);
  const { area_name, district, zone = '', state } = req.body;

  // Validate required fields
  const validationError = validateAreaInput(area_name, district);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  // Handle optional fields and sanitize input
  const sanitizedData = {
    areaName: validator.escape(area_name),
    districtName: validator.escape(district),
    zoneName: validator.isEmpty(zone) ? null : validator.escape(zone),
    stateName: validator.escape(state),
  };

  try {
    // Check if the area already exists
    const existingArea = await MasterAreaModel.findOne({ where: { areaName: sanitizedData.areaName } });
    if (existingArea) {
      return res.status(409).json({ message: 'Area already exists' });
    }

    // Create the area
    const newArea = await MasterAreaModel.create(sanitizedData);
    return res.status(201).json({ message: 'Area created successfully', area: newArea });

  } catch (error) {
    console.error("Error in createArea:", error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Update an area by id
exports.updateArea = async (req, res) => {
  const id = Number(req.params.id);
  console.log("req.id-updateArea", id);

  const { area_name, district, zone = '', state } = req.body;

  // Validate required fields
  const validationError = validateAreaInput(area_name, district);
  if (validationError) {
    return res.status(400).send(validationError);
  }

  // Sanitize the input fields
  const sanitizedData = {
    areaName: validator.escape(area_name),
    districtName: validator.escape(district),
    zoneName: validator.isEmpty(zone) ? null : validator.escape(zone),
    stateName: validator.escape(state),
  };

  try {
    // Update the area in the database
    const [updated] = await MasterAreaModel.update(sanitizedData, { where: { areaId: id } });
    if (updated) {
      const updatedArea = await MasterAreaModel.findByPk(id);
      return res.status(200).json({ message: 'Area updated successfully', area: updatedArea });
    } else {
      return res.status(404).json({ message: 'Area not found' });
    }
  } catch (error) {
    console.error("Error in updateArea:", error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Delete an area by id
exports.deleteArea = async (req, res) => {
  const id = Number(req.params.id);
  console.log("req.id-deleteArea", id);

  try {
    const deleted = await MasterAreaModel.destroy({ where: { areaId: id } });
    if (deleted) {
      return res.status(204).send(); // No content
    } else {
      return res.status(404).json({ message: 'Area not found' });
    }
  } catch (error) {
    console.error("Error in deleteArea:", error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// List all areas and render to the dashboard
exports.getAllArea = async (req, res) => {
  try {
    const areas = await MasterAreaModel.findAll();
    res.render("dashboard/areas/index", {
      title: "All Area",
      areas: areas,
    });
  } catch (error) {
    console.error("Error in getAllArea:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get all areas for DataTable API
exports.getAllAreaApi = async (req, res) => {
  try {
    const areas = await MasterAreaModel.findAll();
    console.log("Fetched all area data for API.");
    return res.json({ data: areas });
  } catch (error) {
    console.error("Error in getAllAreaApi:", error);
    return res.status(500).json({ message: 'Failed to retrieve areas for API. Please try again later.', error: error.message });
  }
};
