const { MasterEmployeeModel } = require('../Models/index'); 
const { v4: uuidv4 } = require("uuid"); 
const {handleSequelizeErrors } = require("../services/helperService"); 
 

// Create a new employee
exports.createEmployee = async (req, res) => {
    const {
        employee_name,
        email,
        confirm_password,
        designation,
        doj,
        dol,
        gender,
        dob,
        blood_group,
        address,
        primary_mobile,
        father_name,
        mother_name,
        father_mobile,
        mother_mobile,
        spouse_name,
        spouse_mobile,
        bank_name,
        bank_account,
        ifsc_code,
        aadhar_number,
        pan_number,
        reference,
        photo,
        role
    } = req.body;

    try {
        const sanitizedData = {
            empId: uuidv4().replace(/-/g, ''),
            employeeName: employee_name,
            emailId: email,
            password: confirm_password, // Consider hashing this before saving
            designation,
            dateOfJoining: doj,
            dateOfLeaving: dol || null,
            gender,
            dateOfBirth: dob || null,
            bloodGroup: blood_group || null,
            address: address || null,
            primaryMobileNumber: primary_mobile,
            fatherName: father_name || null,
            motherName: mother_name || null,
            fatherMobileNumber: father_mobile || null,
            motherMobileNumber: mother_mobile || null,
            spouseName: spouse_name || null,
            spouseMobileNumber: spouse_mobile || null,
            bankName: bank_name || null,
            bankAccountNumber: bank_account || null,
            ifscCode: ifsc_code || null,
            aadharNumber: aadhar_number || null,
            panNumber: pan_number || null,
            reference: reference || null,
            photo: photo || null,
            role
        };

        // Create the employee in the database
        const result = await MasterEmployeeModel.create(sanitizedData);

        console.log("Employee created successfully:", result);
        return res.status(201).json({
            success: true,
            message: 'Employee was created.',
            employee: result // Optionally return the created employee
        });
        
    } catch (error) {
        console.error("Error creating employee:", error);
        const { status, message, details } = handleSequelizeErrors(error);
        return res.status(status || 500).json({ success: false, error: message, details });
    }
};

// // Read an employee by ID
// exports.getEmployeeById = async (req, res) => {
//     try {
//         const employee = await MasterEmployee.findByPk(req.params.id);
//         if (employee) {
//             res.status(200).json(employee);
//         } else {
//             res.status(404).json({ message: 'Employee not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Delete an employee by ID
exports.deleteEmployeeApi = async (req, res) => {
    try {
        // Extract employee ID from request parameters
        const { id } = req.params;

        // Check if the employee exists before attempting to delete
        const employee = await MasterEmployeeModel.findByPk(id);
        if (!employee) {
            return res.status(404).send({
                success: false,
                message: "Employee not found.",
            });
        }

        // Delete the employee
        await employee.destroy();

        // Log successful employee deletion
        console.log("Deleted employee successfully:", employee);

        return res.status(200).send({
            success: true,
            message: "Employee deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).send({
            success: false,
            message: "Failed to delete employee. Please try again later.",
            error: error.message,
        });
    }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    // Debugging log for incoming request body
    console.log("Req.body-updateEmployee", req.body);

    // Destructure properties from request body
    const {
        edit_employee_name,
        edit_email,
        edit_confirm_password,
        edit_designation = '',
        edit_doj = '',
        edit_dol = '',
        edit_gender = '',
        edit_dob = '',
        edit_blood_group = '',
        edit_address = '',
        edit_primary_mobile = '',
        edit_father_name = '',
        edit_mother_name = '',
        edit_father_mobile = '',
        edit_mother_mobile = '',
        edit_spouse_name = '',
        edit_spouse_mobile = '',
        edit_bank_name = '',
        edit_bank_account = '',
        edit_ifsc_code = '',
        edit_aadhar_number = '',
        edit_pan_number = '',
        edit_reference = '',
        edit_photo = '',
        edit_role = '',
        
    } = req.body;

    // Validate required fields
    // Uncomment this if employee_name is required
    if (!validator.isAlpha(edit_employee_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid employee name');
    }

    if (!validator.isEmail(edit_email)) {
        return res.status(400).send('Invalid email address');
    }

    // Validate password
    if (!validator.isStrongPassword(edit_confirm_password, { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        return res.status(400).send('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character');
    }

    // Handle optional fields, ensuring safe escape of values
    const sanitizedData = {
        // You should not create a new empId here; use the existing one instead
        // empId: uuidv4(), // Remove this line
        employeeName: validator.escape(edit_employee_name),
        emailId: validator.escape(edit_email),
        password: validator.escape(edit_confirm_password),
        role: validator.isEmpty(edit_role) ? null : validator.escape(edit_role),
        designation: validator.isEmpty(edit_designation) ? null : validator.escape(edit_designation),
        dateOfJoining: validator.isEmpty(edit_doj) ? null : validator.escape(edit_doj),
        dateOfLeaving: validator.isEmpty(edit_dol) ? null : validator.escape(edit_dol),
        gender: validator.isEmpty(edit_gender) ? null : validator.escape(edit_gender),
        dateOfBirth: validator.isEmpty(edit_dob) ? null : validator.escape(edit_dob),
        bloodGroup: validator.isEmpty(edit_blood_group) ? null : validator.escape(edit_blood_group),
        address: validator.isEmpty(edit_address) ? null : validator.escape(edit_address),
        primaryMobileNumber: validator.isEmpty(edit_primary_mobile) ? null : validator.escape(edit_primary_mobile),
        fatherName: validator.isEmpty(edit_father_name) ? null : validator.escape(edit_father_name),
        motherName: validator.isEmpty(edit_mother_name) ? null : validator.escape(edit_mother_name),
        fatherMobileNumber: validator.isEmpty(edit_father_mobile) ? null : validator.escape(edit_father_mobile),
        motherMobileNumber: validator.isEmpty(edit_mother_mobile) ? null : validator.escape(edit_mother_mobile),
        spouseName: validator.isEmpty(edit_spouse_name) ? null : validator.escape(edit_spouse_name),
        spouseMobileNumber: validator.isEmpty(edit_spouse_mobile) ? null : validator.escape(edit_spouse_mobile),
        bankName: validator.isEmpty(edit_bank_name) ? null : validator.escape(edit_bank_name),
        bankAccountNumber: validator.isEmpty(edit_bank_account) ? null : validator.escape(edit_bank_account),
        ifscCode: validator.isEmpty(edit_ifsc_code) ? null : validator.escape(edit_ifsc_code),
        aadharNumber: validator.isEmpty(edit_aadhar_number) ? null : validator.escape(edit_aadhar_number),
        panNumber: validator.isEmpty(edit_pan_number) ? null : validator.escape(edit_pan_number),
        reference: validator.isEmpty(edit_reference) ? null : validator.escape(edit_reference),
        photo: validator.isEmpty(edit_photo) ? null : validator.escape(edit_photo),
    };

    try {
        // Update the employee record in the database
        const [updated] = await MasterEmployeeModel.update(sanitizedData, {
            where: { empId: req.params.id } // Ensure you are using the correct ID from the route
        });

        // Check if the update was successful
        if (updated) {
            const updatedEmployee = await MasterEmployeeModel.findByPk(req.params.id);
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        console.error("Error updating employee:", error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};



// List all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await MasterEmployeeModel.findAll();

        // Log successful data retrieval
        console.log("Fetched all employee data successfully.");

        return res.render("dashboard/employees/index", {
            title: "Employees"
        });
    } catch (error) {
        console.error("Error fetching employee data:", error);
        return res.status(500).send({
            message: "Failed to retrieve employee data. Please try again later.",
        });
    }
};


// List all employees (API)
exports.getEmployeesApi = async (req, res) => {
    // Debugging: Function has been called
    console.log("Request received at getAllEmployeesApi");

    try {
        // Fetch all employees from the database
        const employees = await MasterEmployeeModel.findAll();
        
        // Debugging: Log the number of employees fetched
        console.log(`Fetched ${employees.length} employees successfully from the API.`);

        // Send the response with the data
        return res.status(200).json({ 
            success: true, 
            message: "Employees retrieved successfully", 
            data: employees
        });

    } catch (error) {
        // Error handling: Log the error details
        console.error("Error occurred in getAllEmployeesApi:", error);

        // Send error response
        return res.status(500).json({ 
            success: false, 
            message: "Failed to retrieve employees. Please try again later.", 
            error: error
        });
    }
};




