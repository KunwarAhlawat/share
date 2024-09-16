const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { sequelize } = require('./Models/index'); 
const methodOverride = require('method-override');

require('dotenv').config();



// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form-encoded data
// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(methodOverride('_method'));

// Session Configuration
app.use(session({
    secret: 'kunwar',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true in production with HTTPS
}));

// Flash Messages
app.use(flash());

// Middleware to expose flash messages and session data to all templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.session.user;
    next();
});

// Routes
const pageRoutes = require('./routes/pageRoutes');
// const apiDashboardRoutes = require('./routes/apiDashboardRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/', pageRoutes);
// app.use('/', apiDashboardRoutes);
app.use('/', dashboardRoutes);

// Sync Sequelize models with the database
// sequelize.sync({ alter: true })
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

// Error handling: 404 Page Not Found
app.use((req, res) => {
    res.status(404).render('index', { message: 'Page not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
