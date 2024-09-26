const { where } = require('sequelize');
const { MasterEmployeeModel} = require('../Models/index'); 
const bcrypt = require("bcryptjs");




// show login page
exports.showLogin = async (req, res) => {
  try { 
    res.render('dashboard/auth/login', { title: "Login" });
  } catch (err) {
    console.error("Error during rendering login page:", err);
    // Correct the render path for the error case
    res.render('dashboard/auth/login', { title: "Login", error: "An error occurred. Please try again." });
  }
};

// Handle login
exports.login = async (req, res) => {
  

  const { user_email, user_password } = req.body;
  console.log("Login process started",req.body);
  try {
    // Fetch user data
    const user = await MasterEmployeeModel.findOne({where:{ emailId: user_email}});



    // Check if user was found
    if (!user) {
      console.log("User Not Found");
      return res.redirect('/dashboard/login');
    }
    

    console.log("User found:", user);
    res.render('dashboard/mainDashboard',{title:"Dashboard",user:user});
    // Uncomment for password comparison when bcrypt is set up
    // const bcrypt = require('bcrypt');
    // if (await bcrypt.compare(user_password, user.password)) {
    //     req.session.user = user;
    //     req.flash('success', 'Logged in successfully.');
    //     return res.redirect('/dashboard');
    // } else {
    //     req.flash('error', 'Invalid email or password.');
    //     return res.redirect('/dashboard/login');
    // }

  } catch (err) {
    console.error("Error during login:", err);
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


