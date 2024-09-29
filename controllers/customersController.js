const { v4: uuidv4 } = require("uuid");
const { Op } = require('sequelize');
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

// Controller Function: List all customers (API)
exports.getCustomersApi = async (req, res) => {
    console.log("Request received at getCustomersApi");

    try {
        // Fetch all customers from the database
        const customers = await MasterCustomerModel.findAll({
            include: [{
                model: MasterAreaModel,
                as: 'area'  // Ensure this matches the alias defined in your association
            },
            {
                model: MasterCategoriesModel,
                as: 'categories'  // Ensure this matches the alias defined in your association
            },
            {
                model: CustomerContactsModel,
                as: 'contacts'  // Ensure this matches the alias defined in your association
            },{
                model: MasterFirmModel,
                as: 'firms'  // Ensure this matches the alias defined in your association
            },
            {
                model: MasterGradeModel,
                as: 'grade'  // Ensure this matches the alias defined in your association
            },{
                model: MasterProductsModel,
                as: 'products'  // Ensure this matches the alias defined in your association
            }]
        });

        console.log(`Fetched ${customers.length} customers successfully from the API.`);

        return res.status(200).json({ 
            success: true, 
            message: "Customers retrieved successfully", 
            data: customers 
        });
    } catch (error) {
        console.error("Error occurred in getCustomersApi:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve customers. Please try again later.", 
            error: error.message 
        });
    }
};

// Controller Function: Get one customer (API)
exports.getOneCustomerApi = async (req, res) => {
    console.log("Request received at getOneCustomerApi");

    try {
        const customerId = Number(req.params.id);

        // Fetch the customer and include related areas
        const customer = await MasterCustomerModel.findOne({
            where: { customerId: customerId },
            include: [{
                model: MasterAreaModel,
                as: 'areas'  // Ensure this matches the alias defined in your association
            }]
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found."
            });
        }

        console.log(`Customer with ID ${customerId} retrieved successfully.`, customer);

        return res.status(200).json({
            success: true,
            message: "Customer retrieved successfully.",
            data: customer
        });
    } catch (error) {
        console.error("Error occurred in getOneCustomerApi:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve customer. Please try again later.",
            error: error.message
        });
    }
};

// Controller Function: Create a new customer (API)
exports.createCustomerApi = async (req, res) => {
    console.log("CreateCustomerApi is requested", req.body);

    try {
        const {
            customer_code, 
            customer_name, 
            status, 
            customer_status, 
            customer_address, 
            customer_pincode, 
            customer_grade, 
            customer_area, 
            customer_products, 
            customer_firms,
            customer_categories,
            customerContacts,
            customer_credit, 
            customer_credit_days, 
            customer_reference_1_name, 
            customer_reference_1_contact,
            customer_reference_2_name, 
            customer_reference_2_contact, 
        } = req.body;

     
        // Check if the customer with the same code or name already exists
        const foundCustomer = await MasterCustomerModel.findOne({
            where: {
                [Op.or]: [
                    { customerName: customer_name },
                    { customerCode: customer_code }
                ]
            }
        });

        // If a customer is found with the same code or name, return an error
        if (foundCustomer) {
            const errorMessage = foundCustomer.customerName === customer_name
                ? "customer-found"
                : "code-found";

            return res.status(400).send({
                success: false,
                message: errorMessage
            });
        }

        // Preparing data for customer creation
        const resolvedData = {
            customerId: uuidv4().replace(/-/g, ''), // Generate UUID without dashes
            customerCode: customer_code,
            customerName: customer_name,
            status: status,
            pincode: customer_pincode || null,
            address: customer_address || null,
            referenceName1: customer_reference_1_name || null,
            reference1ContactNumber: customer_reference_1_contact || null,
            referenceName2: customer_reference_2_name || null,
            reference2ContactNumber: customer_reference_2_contact || null,
            creditLimit: customer_credit || null,
            creditDays: customer_credit_days || null,
            customerStatus: customer_status || null
        };

        // Create the new customer in the database
        const newCustomer = await MasterCustomerModel.create(resolvedData);

        // Associate grade if provided
        if (customer_grade) {
            await newCustomer.setGrade(customer_grade);
        }

        // Associate area if provided
        if (customer_area) {
            await newCustomer.setArea(customer_area);
        }

        // Associate products if provided
        if (customer_products && customer_products.length > 0) {
            await newCustomer.setProducts(customer_products);
        }

        // Associate firms if provided
        if (customer_firms && customer_firms.length > 0) {
            await newCustomer.setFirms(customer_firms);
        }

        // Associate categories if provided
        if (customer_categories && customer_categories.length > 0) {
            await newCustomer.setCategories(customer_categories);
 
        }


        console.log("Type check for customer Contact",typeof customerContacts);
        const newCustomerContact = JSON.parse(customerContacts);
// Associate customer contacts if provided and if it's an array
if (newCustomerContact && newCustomerContact.length > 0) {
    try {
        // debug
        console.log("Customer Contact Add running", newCustomerContact);

        // Create customer contacts and associate them with the customer
        const contacts = await Promise.all(
            newCustomerContact.map(contact => {
                return CustomerContactsModel.create({
                    contactId: uuidv4().replace(/-/g, ''),
                    customerId: newCustomer.customerId,  // Associate with customerId
                    ...contact
                });
            })
        );

        console.log("From Customer Contact: ", contacts);

        // Assign the created contacts to the new customer (if alias 'contacts' is set up correctly)
        newCustomer.contacts = contacts;  

    } catch (error) {
        console.error("Error while adding customer contacts:", error);
    }
}



        

        console.log("Created new customer successfully:", newCustomer);

        // Return success response
        return res.status(201).send({
            success: true,
            message: "Customer created successfully.",
            data: newCustomer
        });

    } catch (error) {
        console.error("Error creating customer:", error);

        // Return error response
        return res.status(500).send({
            success: false,
            message: "Failed to create customer. Please try again later.",
            error: error.message
        });
    }
};


// Controller Function: Update an existing customer (API)
exports.updateCustomerApi = async (req, res) => {
    console.log("UpdateCustomerApi is requested", req.body);

    try {
        const { edit_customer_name, edit_customer_code, edit_customer_grade, edit_area_ids } = req.body;

        const customer = await MasterCustomerModel.findByPk(Number(req.params.id));

        if (!customer) {
            return res.status(404).send({
                success: false,
                message: "Customer not found."
            });
        }

        const updatedData = {
            customerName: edit_customer_name,
            customerCode: edit_customer_code,
            gradeId: edit_customer_grade
        };

        await customer.update(updatedData);

        if (edit_area_ids && edit_area_ids.length > 0) {
            await customer.setAreas(edit_area_ids);
        } else {
            await customer.setAreas([]);
        }

        console.log("Updated customer successfully:", customer);

        return res.status(200).send({
            success: true,
            message: "Customer updated successfully.",
            data: customer
        });
    } catch (error) {
        console.error("Error updating customer:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to update customer. Please try again later.",
            error: error.message
        });
    }
};

// Controller Function: Delete a customer by ID (API)
exports.deleteCustomerApi = async (req, res) => {
    try {
        const { id } = req.params;

        const customer = await MasterCustomerModel.findByPk(id);

        if (!customer) {
            return res.status(404).send({
                success: false,
                message: "Customer not found."
            });
        }

        await customer.destroy();

        console.log("Deleted customer successfully:", customer);

        return res.status(200).send({
            success: true,
            message: "Customer deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting customer:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete customer. Please try again later.",
            error: error.message
        });
    }
};
