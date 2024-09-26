// Controller for handling home, products, vendors, distribution, and contact pages

// Generic function for rendering pages
const renderPage = (res, page, title) => {
    try {
        res.render(`pages/${page}`, {
            title: title
        });
    } catch (err) {
        console.error(`Error rendering ${page} page:`, err);
        res.status(500).send('Server Error');
    }
};

// Home Page
exports.home = (req, res) => {
    renderPage(res, 'home', 'Home');
};

// Products Page
exports.products = (req, res) => {
    renderPage(res, 'products', 'Products');
};

// Products Detail Page
exports.productDetail = (req, res) => {
    if (req.params.id === "coal") {
        renderPage(res, 'products/product-coal', req.params.id);
    } else if (req.params.id === "coke") {
        renderPage(res, 'products/product-coke', req.params.id);
    } else if (req.params.id === "charcoal") {
        renderPage(res, 'products/product-charcoal', req.params.id);
    } else if (req.params.id === "coal-dust") {
        renderPage(res, 'products/product-coal-dust', req.params.id);
    } else if (req.params.id === "pig-iron") {
        renderPage(res, 'products/product-pig-iron', req.params.id);
    } else if (req.params.id === "ferro-alloys") {
        renderPage(res, 'products/product-ferro-alloys', req.params.id);
    } else {
        // Handle the case where the ID does not match any known product
        res.status(404).send('Product not found');
    }
};


// Vendors Page
exports.vendors = (req, res) => {
    renderPage(res, 'vendors', 'Vendors');
};

// Distribution Page
exports.distribution = (req, res) => {
    renderPage(res, 'distribution', 'Distribution');
};

