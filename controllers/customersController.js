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

exports.getAllCustomers = async (req, res) => {
  try {
    // Fetch all customers with related models
    const categories = await MasterCategoriesModel.findAll();
  

    const result = JSON.stringify(categories);
    const resultParsed = JSON.parse(result)
    //debug
    console.log("ResultParsed-getAllCustomersApi", resultParsed);
    // Send JSON response
    res.render("dashboard/customers/index", {
      title: "All Customer",
      data: resultParsed,
  });
  } catch (error) {
    console.error("Error in getAllCustomersApi:", error);
    res.status(500).send({ message: error.message });
  }
};

// Get all customers with related firms, categories, and products for DataTable
exports.getAllCustomersApi = async (req, res) => {
  try {
    // Fetch all customers with related models
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

    const result = JSON.stringify(customers);
    const resultParsed = JSON.parse(result)
    //debug
    // console.log("ResultParsed-getAllCustomersApi", resultParsed);
    // Send JSON response
    res.json({ data: resultParsed });
  } catch (error) {
    console.error("Error in getAllCustomersApi:", error);
    res.status(500).send({ message: error.message });
  }
};


// Create a new customer
exports.apiCreateCustomer = async (req, res) => {
  try {
    console.log("req.body-apiCreateCustomer", req.body);

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

    // Handle optional fields
    const sanitizedData = {
      customerId: uuidv4(), // Generate a unique ID for the customer
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

    const customer = await MasterCustomerModel.create(sanitizedData);
    console.log(Object.keys(customer.__proto__)); // Check available methods

    // Associate categories only if categories are provided
    if (category_ids && category_ids.length) {
      await customer.addMaster_categories(category_ids);
    }

    // Respond with success message
    res.status(201).json({ message: 'Customer was created successfully.' });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ message: error.message });
  }
};


// // Update an existing customer
// exports.updateCustomer = async (req, res) => {
//   try {
//     const { name, email, firmIds, categoryIds, productIds } = req.body;
//     const customer = await db.Customer.findByPk(req.params.id);

//     await customer.update({ name, email });

//     if (firmIds) await customer.setFirms(firmIds);
//     if (categoryIds) await customer.setCategories(categoryIds);
//     if (productIds) await customer.setProducts(productIds);

//     res.redirect('/customers');
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// // Delete a customer
// exports.deleteCustomer = async (req, res) => {
//   try {
//     await db.Customer.destroy({ where: { id: req.params.id } });
//     res.redirect('/customers');
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };
