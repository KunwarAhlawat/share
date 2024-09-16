//This controller is use for Dashboard

// Home Page
exports.dashboard= (req, res) => {
    try {
        res.render('dashboard/mainDashboard',{
            title:'dashboard',
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};