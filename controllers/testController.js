const { TestModel } = require("../Models/index");
const { v4: uuidv4 } = require("uuid");

const { handleSequelizeErrors } = require("../services/helperService");

exports.getView = async (req, res) => {
    try {
      const result = await TestModel.findAll();
      // Debugging output
      console.log("Test Data - getView", result);
      
      // Render the view with the retrieved data
      res.render("test", {
        data: result,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Something went wrong");
    }
  };
  


// Create a new employee
exports.create = async (req, res) => {
    // debug
     console.log("Create chl raha ha");
  const { name } = req.body;

  try {
    const sanitizedData = {
      name: name || null,
    };

    // Create the employee in the database
    const result = await TestModel.create(sanitizedData);

    console.log("Record created successfully:", result);
    return res.status(201).json({
      success: true,
      message: "Record was created.",
      name: result, // Optionally return the created employee
    });
  } catch (error) {
    console.error("Error creating Record:", error);
    const { status, message, details } = handleSequelizeErrors(error);
    return res
      .status(status || 500)
      .json({ success: false, error: message, details });
  }
};
