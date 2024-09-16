//This controller is use for home, about, contact, privacy page

// Home Page
exports.home= (req, res) => {
    try {
        res.render('pages/home',{
            title:'Home',
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};