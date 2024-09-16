const { MasterEmployeeModel } = require('../Models/index'); 
const { v4: uuidv4 } = require("uuid"); 
const validator = require('validator');

// Create a new employee
exports.createEmployee = async (req, res) => {
   
    const {
        employee_name,
        designation = '',
        doj = '',
        dol = '',
        gender = '',
        dob = '',
        blood_group = '',
        address = '',
        primary_mobile = '',
        email,
        father_name = '',
        mother_name = '',
        father_mobile = '',
        mother_mobile = '',
        spouse_name = '',
        spouse_mobile = '',
        bank_name = '',
        bank_account = '',
        ifsc_code = '',
        aadhar_number = '',
        pan_number = '',
        reference = '',
        photo = '',
        role = '',
        comments = ''
    } = req.body;

     // Validate required fields
     if (!validator.isAlpha(employee_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid employee name');
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    // Handle optional fields
    const sanitizedData = {
        empId: uuidv4(), // Generate a unique ID for the employee
        employeeName: validator.escape(employee_name),
        designation: validator.isEmpty(designation) ? null : validator.escape(designation),
        dateOfJoining: validator.isEmpty(doj) ? null : validator.escape(doj),
        dateOfLeaving: validator.isEmpty(dol) ? null : validator.escape(dol),
        gender: validator.isEmpty(gender) ? null : validator.escape(gender),
        dateOfBirth: validator.isEmpty(dob) ? null : validator.escape(dob),
        bloodGroup: validator.isEmpty(blood_group) ? null : validator.escape(blood_group),
        address: validator.isEmpty(address) ? null : validator.escape(address),
        primaryMobileNumber: validator.isEmpty(primary_mobile) ? null : validator.escape(primary_mobile),
        emailId: validator.escape(email),
        fatherName: validator.isEmpty(father_name) ? null : validator.escape(father_name),
        motherName: validator.isEmpty(mother_name) ? null : validator.escape(mother_name),
        fatherMobileNumber: validator.isEmpty(father_mobile) ? null : validator.escape(father_mobile),
        motherMobileNumber: validator.isEmpty(mother_mobile) ? null : validator.escape(mother_mobile),
        spouseName: validator.isEmpty(spouse_name) ? null : validator.escape(spouse_name),
        spouseMobileNumber: validator.isEmpty(spouse_mobile) ? null : validator.escape(spouse_mobile),
        bankName: validator.isEmpty(bank_name) ? null : validator.escape(bank_name),
        bankAccountNumber: validator.isEmpty(bank_account) ? null : validator.escape(bank_account),
        ifscCode: validator.isEmpty(ifsc_code) ? null : validator.escape(ifsc_code),
        aadharNumber: validator.isEmpty(aadhar_number) ? null : validator.escape(aadhar_number),
        panNumber: validator.isEmpty(pan_number) ? null : validator.escape(pan_number),
        reference: validator.isEmpty(reference) ? null : validator.escape(reference),
        photo: validator.isEmpty(photo) ? null : validator.escape(photo),
        role: validator.isEmpty(role) ? null : validator.escape(role),
        comments: validator.isEmpty(comments) ? null : validator.escape(comments)
    };

    try {
        // check if employee email already exist
        const result = await MasterEmployeeModel.findOne({ where: { emailId: email } });
          
        // debug
        console.log("Result-Create Employee",result)
                if (result) {
                    res.status(409).json({ message: 'Employee already exists' });
                    
                } else {
                    const employee = await MasterEmployeeModel.create(sanitizedData);
                    res.status(201).json({ message: 'Employee was created.' });
                }
         
        // const employee = await MasterEmployee.create(sanitizedData);
        // res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    const {
        employee_name,
        designation = '',
        doj = '',
        dol = '',
        gender = '',
        dob = '',
        blood_group = '',
        address = '',
        primary_mobile = '',
        email,
        father_name = '',
        mother_name = '',
        father_mobile = '',
        mother_mobile = '',
        spouse_name = '',
        spouse_mobile = '',
        bank_name = '',
        bank_account = '',
        ifsc_code = '',
        aadhar_number = '',
        pan_number = '',
        reference = '',
        photo = '',
        role = '',
        comments = ''
    } = req.body;

     // Validate required fields
     if (!validator.isAlpha(employee_name.replace(/\s/g, ''), 'en-US', { ignore: ' ' })) {
        return res.status(400).send('Invalid employee name');
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send('Invalid email address');
    }

    // Handle optional fields
    const sanitizedData = {
        empId: req.params.id, 
        employeeName: validator.escape(employee_name),
        designation: validator.isEmpty(designation) ? null : validator.escape(designation),
        dateOfJoining: validator.isEmpty(doj) ? null : validator.escape(doj),
        dateOfLeaving: validator.isEmpty(dol) ? null : validator.escape(dol),
        gender: validator.isEmpty(gender) ? null : validator.escape(gender),
        dateOfBirth: validator.isEmpty(dob) ? null : validator.escape(dob),
        bloodGroup: validator.isEmpty(blood_group) ? null : validator.escape(blood_group),
        address: validator.isEmpty(address) ? null : validator.escape(address),
        primaryMobileNumber: validator.isEmpty(primary_mobile) ? null : validator.escape(primary_mobile),
        emailId: validator.escape(email),
        fatherName: validator.isEmpty(father_name) ? null : validator.escape(father_name),
        motherName: validator.isEmpty(mother_name) ? null : validator.escape(mother_name),
        fatherMobileNumber: validator.isEmpty(father_mobile) ? null : validator.escape(father_mobile),
        motherMobileNumber: validator.isEmpty(mother_mobile) ? null : validator.escape(mother_mobile),
        spouseName: validator.isEmpty(spouse_name) ? null : validator.escape(spouse_name),
        spouseMobileNumber: validator.isEmpty(spouse_mobile) ? null : validator.escape(spouse_mobile),
        bankName: validator.isEmpty(bank_name) ? null : validator.escape(bank_name),
        bankAccountNumber: validator.isEmpty(bank_account) ? null : validator.escape(bank_account),
        ifscCode: validator.isEmpty(ifsc_code) ? null : validator.escape(ifsc_code),
        aadharNumber: validator.isEmpty(aadhar_number) ? null : validator.escape(aadhar_number),
        panNumber: validator.isEmpty(pan_number) ? null : validator.escape(pan_number),
        reference: validator.isEmpty(reference) ? null : validator.escape(reference),
        photo: validator.isEmpty(photo) ? null : validator.escape(photo),
        role: validator.isEmpty(role) ? null : validator.escape(role),
        comments: validator.isEmpty(comments) ? null : validator.escape(comments)
    };
    try {
        const [updated] = await MasterEmployeeModel.update(sanitizedData, {
            where: { empId: req.params.id }
        });
        if (updated) {
            const updatedEmployee = await MasterEmployeeModel.findByPk(req.params.id);
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await MasterEmployeeModel.destroy({
            where: { empId: req.params.id }
        });
        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await MasterEmployeeModel.findAll();
         
        // convert to plain array of object
        const resolvedData = employees.map((item) => item.dataValues);
        
        // debug
        console.log("ResolvedData-getAllEmployees", resolvedData)
        res.render("dashboard/employees/index", {
            title: "All Employees",
            data: resolvedData,
        });
        // res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
