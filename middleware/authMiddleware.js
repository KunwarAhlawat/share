// Example middleware for authentication
module.exports = (req, res, next) => {
    // Simple authentication check
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};
