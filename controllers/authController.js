const { masterEmployeeModel} = require('../Models/index'); 
const {  createRecord,
  findAllRecords,
  findOneRecord,
  updateRecord,
  deleteRecord } = require("../services/databaseService");

  const bcrypt = require("bcryptjs");

// Show login form
exports.showLoginForm = async (req, res) => {
    res.render('dashboard/auth/login', {
        title: 'Login',
        // data: resolvedData, 
   
    });
}


// Handle login
exports.login = async (req, res) => {
 
// Destructure email and password from the request body
  const { email, password } = req.body;

  try {
      // Fetch user data using findOneRecord function(model, id(value), column Name)
      const result = await findOneRecord(masterEmployeeModel, email, "emailId");

      // Check for errors in the result
      if (result.error) {
          console.log("Error from findOneRecord:", result.error);
          req.flash('error', result.error);
          return res.redirect('/dashboard/login,{msg:"Incorrect User Name Password"}');
      }

      const user = result.data;

      // Log the user object to inspect its structure
      console.log("User found:", user);

      if (user) {
          // Assuming password comparison is needed
          // Uncomment when bcrypt is set up
          // const bcrypt = require('bcrypt');
          // if (await bcrypt.compare(password, user.password)) {
          //     req.session.user = user;
          //     req.flash('success', 'Logged in successfully.');
          //     return res.redirect('/dashboard');
          // } else {
          //     req.flash('error', 'Invalid email or password.');
          //     return res.redirect('/dashboard/login');
          // }

          // For testing purposes, respond with the email
          res.send(`Logged in as ${email}`);
      } else {
          console.log("User not found.");
          req.flash('error', 'Invalid email or password.');
          return res.redirect('/dashboard/login');
      }
  } catch (err) {
      console.error("Error during login:", err);
      req.flash('error', 'An error occurred.');
      res.redirect('/dashboard/login');
  }
};


  
  // Handle logout
  exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        req.flash('error', 'An error occurred.');
        return res.redirect('/');
      }
      res.redirect('/login');
    });
  };


exports.register = async (req, res) => {
    try {
        // Await the data function to resolve it
        // const resolvedData = await data(); // Ensure you call data() here

        // // Log the resolved data for debugging
        // console.log("Data (From areasController):", resolvedData.allAreas);

        // Render the response with the resolved data
        res.render('dashboard/auth/register', {
            title: 'Login',
     
            // data: resolvedData, 
    
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


