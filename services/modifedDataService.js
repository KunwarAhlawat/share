// This file contains functions that shape or modify the data for view tables

// Import all Models
const {
    sequelize,
    customerCategoryModel,
    customerContactModel,
    customerFirmModel,
    customerProductModel,
    masterAreaModel,
    masterCategoriesModel,
    masterCustomerModel,
    masterEmployeeModel,
    masterFirmModel,
    masterGradeModel,
    masterProductGroupModel,
    masterProductsModel,
    masterTeamsModel,
    masterVendorsModel,
} = require("../models/index");

// Import database service to perform CRUD operations
const {
    createRecord,
    findAllRecords,
    findOneRecord,
    updateRecord,
    deleteRecord,
} = require("../services/databaseService");

// Import helper functions
const {
    getIdFromCustomersPrefixTable,
    getDataFromMasterPrefixTable,
} = require("../services/helperService");

const data = async () => {
    try {
        // Fetch all records from master and customer tables
        const [
            masterCustomers,
            masterFirms,
            masterGrades,
            masterProductGroups,
            masterProducts,
            masterTeams,
            masterVendors,
            masterAreas,
            masterCategories,
            masterEmployees,
            customerCategories,
            customerContacts,
            customerFirms,
            customerProducts,
        ] = await Promise.all([
            findAllRecords(masterCustomerModel),
            findAllRecords(masterFirmModel),
            findAllRecords(masterGradeModel),
            findAllRecords(masterProductGroupModel),
            findAllRecords(masterProductsModel),
            findAllRecords(masterTeamsModel),
            findAllRecords(masterVendorsModel),
            findAllRecords(masterAreaModel),
            findAllRecords(masterCategoriesModel),
            findAllRecords(masterEmployeeModel),
            findAllRecords(customerCategoryModel),
            findAllRecords(customerContactModel),
            findAllRecords(customerFirmModel),
            findAllRecords(customerProductModel),
        ]);

        // Convert data to plain arrays of objects
        const allCustomer = masterCustomers.data.map(item => item.dataValues);
        const allCategories = masterCategories.data.map(item => item.dataValues);
        const allFirms = masterFirms.data.map(item => item.dataValues);
        const allGrades = masterGrades.data.map(item => item.dataValues);
        const allProducts = masterProducts.data.map(item => item.dataValues);
        const allAreas = masterAreas.data.map(item => item.dataValues);
        const allProductGroups = masterProductGroups.data.map(item => item.dataValues);
        const allCustomerCategories = customerCategories.data.map(item => item.dataValues);
        const allCustomerContacts = customerContacts.data.map(item => item.dataValues);
        const allCustomerFirms = customerFirms.data.map(item => item.dataValues);
        const allCustomerProducts = customerProducts.data.map(item => item.dataValues);
        // const allTeams = masterTeams.data.map(item => item.dataValues);
        // const allVendors = masterVendors.data.map(item => item.dataValues);
        const allEmployees = masterEmployees.data.map(item => item.dataValues);
       
        // console.log("All Employees",allEmployees)
        // Process customer data and enrich it with related data
        const allData = allCustomer.map(customer => {
            const { customerId, area, grade } = customer;
            const areaId = Number(area);
            const gradeId = Number(grade);

            // Get related IDs from customer data
            const categoriesId = getIdFromCustomersPrefixTable(allCustomerCategories, customerId);
            const allContact = getIdFromCustomersPrefixTable(allCustomerContacts, customerId);
            const firmsId = getIdFromCustomersPrefixTable(allCustomerFirms, customerId);
            const productsId = getIdFromCustomersPrefixTable(allCustomerProducts, customerId);

            // Get related data from master tables
            const categories = getDataFromMasterPrefixTable(allCategories, categoriesId, "category");
            const firms = getDataFromMasterPrefixTable(allFirms, firmsId, "firm");
            const products = getDataFromMasterPrefixTable(allProducts, productsId, "product");
            const areas = getDataFromMasterPrefixTable(allAreas, areaId, "area");
            const grades = getDataFromMasterPrefixTable(allGrades, gradeId, "grade");
    
            
            // Enrich customer data with related information
            return {
                ...customer,
                categories,
                firms,
                products,
                areas,
                grades,
                contacts: allContact,
            };
        });

        return {
            allData,
            allCategories,
            allFirms,
            allGrades,
            allProducts,
            allAreas,
            allProductGroups,
            allCustomerCategories,
            allCustomerContacts,
            allCustomerFirms,
            allCustomerProducts,
            allEmployees
            
        };
    } catch (err) {
        console.error(err);
        throw err; // Rethrow the error for the controller to handle
    }
};

module.exports = {
    data,
};
