const { v4: uuidv4 } = require("uuid");
const validator = require('validator');
const {
  sequelize,
  MasterCustomerModel,
  CustomerContactsModel,
  CustomerCategoryModel,
  CustomerFirmModel,
  CustomerProductModel,
  MasterAreaModel,
  MasterCategoriesModel,
  MasterEmployeeModel,
  MasterFirmModel,
  MasterGradeModel,
  MasterProductGroupModel,
  MasterProductsModel,
  MasterTeamsModel,
} = require("../Models/index");

// Get all customers with related models
exports.getAllCustomers = async (req, res) => {
  try {
    const categories = await MasterCategoriesModel.findAll();
    const contacts = await CustomerContactsModel.findAll();
    const firms = await MasterFirmModel.findAll();
    const grades = await MasterGradeModel.findAll();
    const areas = await MasterAreaModel.findAll();

    console.log("Fetched all data for customers successfully.");

    res.render("dashboard/customers/index", {
      title: "All Customer",
      categories,
      contacts,
      firms,
      grades,
      areas,
    });
  } catch (error) {
    console.error("Error fetching customers data:", error);
    res.status(500).send({ message: "Failed to retrieve customer data. Please try again later." });
  }
};

// Get all customers for DataTable with related models
exports.getAllCustomersApi = async (req, res) => {
  try {
    const customers = await MasterCustomerModel.findAll({
      include: [
        { model: MasterFirmModel },
        { model: MasterCategoriesModel },
        { model: MasterProductsModel },
        { model: CustomerContactsModel },
        { model: MasterAreaModel },
        { model: MasterGradeModel },
      ],
    });

    console.log("Fetched all customer data for API.");
    res.json({ data: customers });
  } catch (error) {
    console.error("Error in getAllCustomersApi:", error);
    res.status(500).send({ message: "Failed to retrieve customers for API. Please try again later." });
  }
};

// Create a new customer
exports.apiCreateCustomer = async (req, res) => {
  try {
    console.log("Received request body for new customer:", req.body);

    const {
      customer_code,
      customer_name,
      customer_status,
      status,
      customer_address,
      customer_pincode,
      customer_credit,
      customer_credit_days,
      reference_1_name,
      reference_1_contact,
      reference_2_name,
      reference_2_contact,
      category_ids,
    } = req.body;

    // Sanitize and validate inputs
    const sanitizedData = {
      customerId: uuidv4(),
      customerCode: validator.escape(customer_code),
      customerName: validator.escape(customer_name),
      customerStatus: validator.escape(customer_status),
      status: validator.escape(status),
      pincode: validator.isEmpty(customer_pincode) ? null : validator.escape(customer_pincode),
      address: validator.isEmpty(customer_address) ? null : validator.escape(customer_address),
      referenceName1: validator.isEmpty(reference_1_name) ? null : validator.escape(reference_1_name),
      reference1ContactNumber: validator.isEmpty(reference_1_contact) ? null : validator.escape(reference_1_contact),
      referenceName2: validator.isEmpty(reference_2_name) ? null : validator.escape(reference_2_name),
      reference2ContactNumber: validator.isEmpty(reference_2_contact) ? null : validator.escape(reference_2_contact),
      creditLimit: validator.isEmpty(customer_credit) ? null : validator.escape(customer_credit),
      creditDays: validator.isEmpty(customer_credit_days) ? null : validator.escape(customer_credit_days),
    };

    // Create customer in the database
    const customer = await MasterCustomerModel.create(sanitizedData);
    console.log("Customer created successfully with ID:", customer.customerId);

    // Associate categories if provided
    if (category_ids && category_ids.length) {
      await customer.addMaster_categories(category_ids);
    }

    res.status(201).json({ message: 'Customer created successfully.' });
  } catch (error) {
    console.error("Error creating new customer:", error);
    res.status(500).send({ message: "Failed to create customer. Please try again later." });
  }
};

// Update an existing customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, firmIds, categoryIds, productIds } = req.body;
    const customer = await MasterCustomerModel.findByPk(req.params.id);

    if (!customer) {
      return res.status(404).send({ message: "Customer not found." });
    }

    // Update customer details
    await customer.update({ name, email });
    console.log("Customer updated successfully:", customer.id);

    // Update relationships if provided
    if (firmIds) await customer.setFirms(firmIds);
    if (categoryIds) await customer.setCategories(categoryIds);
    if (productIds) await customer.setProducts(productIds);

    res.redirect('/customers');
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).send({ message: "Failed to update customer. Please try again later." });
  }
};

// // Delete a customer
// exports.deleteCustomer = async (req, res) => {
//   try {
//     const customer = await MasterCustomerModel.findByPk(req.params.id);
//     if (!customer) {
//       return res.status(404).send({ message: "Customer not found." });
//     }

//     await customer.destroy();
//     console.log("Customer deleted successfully:", req.params.id);
//     res.redirect('/customers');
//   } catch (error) {
//     console.error("Error deleting customer:", error);
//     res.status(500).send({ message: "Failed to delete customer. Please try again later." });
//   }
// };
