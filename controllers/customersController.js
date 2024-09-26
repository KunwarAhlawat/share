const { v4: uuidv4 } = require("uuid");

const {
  sequelize,
  MasterCustomerModel,
  CustomerContactsModel,
  MasterAreaModel,
  MasterCategoriesModel,
  MasterFirmModel,
  MasterGradeModel,
  MasterProductsModel,
} = require("../Models/index");

// List all customers
exports.getCustomers = async (req, res) => {
  try {
      const [customers,categories, contacts, firms, grades,areas, products] = await Promise.all([
        MasterCustomerModel.findAll(),  
        MasterCategoriesModel.findAll(),
          CustomerContactsModel.findAll(),
          MasterFirmModel.findAll(),
          MasterGradeModel.findAll(),
          MasterAreaModel.findAll(),
          MasterProductsModel.findAll(),
      ]);

      // Log successful data retrieval
    //   console.log("Fetched all customers data successfully.",customers);

      return res.render("dashboard/customers/index", {
          title: "Customers",
          customers,
          categories,
          contacts,
          firms,
          grades,
          areas,
          products
      });
  } catch (error) {
      console.error("Error fetching customer data:", error);
      return res.status(500).send({
          message: "Failed to retrieve customer data. Please try again later.",
      });
  }
};

// List all customers (API)
exports.getCustomersApi = async (req, res) => {
  // Debugging: Function has been called
  console.log("Request received at getCustomersApi");

  try {
      // Fetch all customers from the database
      const customers = await MasterCustomerModel.findAll({
        include: [
            { model: CustomerContactsModel }, 
            { model:  MasterGradeModel },
            { model:  MasterAreaModel },
            { model:  MasterCategoriesModel },
            { model:  MasterFirmModel },
        ]
    });
      //debug 
    //   console.log("Fetched customers:", customers);
      // Debugging: Log the number of customers fetched
    //   console.log(`Fetched ${customers.length} customers successfully from the API. ${customers}`);

      // Send the response with the data
      return res.status(200).json({ 
          success: true, 
          message: "Customers retrieved successfully", 
          data: customers 
      });

  } catch (error) {
      // Error handling: Log the error details
      console.error("Error occurred in getCustomersApi:", error);

      // Send error response
      return res.status(500).json({ 
          success: false, 
          message: "Failed to retrieve customers. Please try again later.", 
          error: error.message 
      });
  }
};

// Create a new customer
exports.createCustomerApi = async (req, res) => {
    try {
        // Extract customer data from request body
        // const { categoryName } = req.body; 
     

        // Prepare the resolved data
        const resolvedData = {
            customerId: uuidv4().replace(/-/g, ''), 
            customerCode: "kkkkkk", 
            customerName: "Kunwar Ahlawat", 
            status: "UNVERIFIED", 
            customerStatus: "inactive", 
            address: "Near Church Town Daurala Meerut", 
            pincode: "250221", 
            referenceName1: "Uddeshya", 
            reference1ContactNumber: "7906714501", 
            referenceName2: "Pooja", 
            reference2ContactNumber: "8077996085", 
            creditLimit: 1000, 
            creditDays: 10, 
            allotmentId: uuidv4().replace(/-/g, ''), 
          

        };

        // debug
        console.log("Resolved Data", resolvedData)
        // Create a new customer
        const newCustomer = await MasterCustomerModel.create(resolvedData);

        // Log successful customer creation
        console.log("Created new customer successfully:", newCustomer);

        return res.status(201).send({
            success: true,
            message: "Customer created successfully.",
            data: newCustomer,
        });
    } catch (error) {
        console.error("Error creating customer:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to create customer. Please try again later.",
            error: error.message, 
        });
    }
};

// Delete an customer by ID
exports.deleteCustomerApi = async (req, res) => {
    try {
        // Extract customer ID from request parameters
        const { id } = req.params;

        // Check if the customer exists before attempting to delete
        const customer = await MasterCustomerModel.findByPk(id);
        if (!customer) {
            return res.status(404).send({
                success: false,
                message: "Customer not found.",
            });
        }

        // Delete the customer
        await customer.destroy();

        // Log successful customer deletion
        console.log("Deleted customer successfully:", customer);

        return res.status(200).send({
            success: true,
            message: "Customer deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting customer:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete customer. Please try again later.",
            error: error.message,
        });
    }
};


// Create a new customer
exports.createCustomerApi = async (req, res) => {

    // debug
    console.log("Create Customer Api has called",req.body);
    try {
        // Access the form data from req.body
        const customerCode = req.body.customer_code; // Make sure the input name matches
        const grades = JSON.parse(req.body.grades || '[]'); // Parse selected grades
        const areas = JSON.parse(req.body.areas || '[]'); // Parse selected areas
        const products = JSON.parse(req.body.products || '[]'); // Parse selected products
        const firms = JSON.parse(req.body.firms || '[]'); // Parse selected firms

        // Parse contacts array
        const contacts = JSON.parse(req.body.contacts || '[]');

        // Perform your logic to save the customer data
        // For example:
        const newCustomer = await MasterCustomerModel.create({
            customer_code: customerCode,
            grades: grades,
            areas: areas,
            products: products,
            firms: firms,
            contacts: contacts // You may need to adjust this depending on your model
        });

        res.status(201).json({ message: 'Customer created successfully!', data: newCustomer });
    } catch (error) {
        console.error('Error creating new customer:', error);
        res.status(500).json({ message: 'Unexpected error creating new customer', error: error.message });
    }
};


// // Update an existing customer
// exports.updateCustomer = async (req, res) => {
//   try {
//     const { name, email, firmIds, categoryIds, productIds } = req.body;
//     const customer = await MasterCustomerModel.findByPk(req.params.id);

//     if (!customer) {
//       return res.status(404).send({ message: "Customer not found." });
//     }

//     // Update customer details
//     await customer.update({ name, email });
//     console.log("Customer updated successfully:", customer.id);

//     // Update relationships if provided
//     if (firmIds) await customer.setFirms(firmIds);
//     if (categoryIds) await customer.setCategories(categoryIds);
//     if (productIds) await customer.setProducts(productIds);

//     res.redirect('/customers');
//   } catch (error) {
//     console.error("Error updating customer:", error);
//     res.status(500).send({ message: "Failed to update customer. Please try again later." });
//   }
// };
