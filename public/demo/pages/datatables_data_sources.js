/* ------------------------------------------------------------------------------
 *
 *  # Datatables data sources
 *
 *  Demo JS code for datatable_data_sources.html page
 *
 * ---------------------------------------------------------------------------- */


// Setup module
// ------------------------------

// Setup module
// ------------------------------
function decodeHtmlEntities(str) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
}

$(document).ready(function() {
    // Ensure DataTables is loaded
    if (!$().DataTable) {
        console.warn('Warning - datatables.min.js is not loaded.');
        return;
    }

    // Safely parse JSON data
    try {
        // Get the raw JSON data from the script tag
        const rawData = $('#customerData').text();
        
        // Log the raw data to see its format
        // console.log('Raw data:', rawData);

        // Decode HTML entities if necessary
        const decodedData = decodeHtmlEntities(rawData);

        // Log the decoded data to see its format
        // console.log('Decoded data:', decodedData);

        // Parse the JSON data
        const customerData = JSON.parse(decodedData);

        // Log the parsed data to verify its structure
        // console.log('Parsed data:', customerData);

        // Initialize DataTable
        $('.datatable-nested').DataTable({
            data: customerData,
            columns: [
                { data: 'customerCode' },
                { data: 'customerName' },
                { data: 'area' },
                { data: 'status' },
                { data: 'CustomerStatus' },
                { data: 'grade' },
                { data: 'pincode' },
             
            ],
            scrollY: '100vh', // Vertical scroll height
            scrollX: true,   // Horizontal scroll
            scrollCollapse: true, // Allows collapsing of the scrollable area
            paging: true, // Enable pagination
            responsive: true, // Responsive table
         
        });
    } catch (e) {
        console.error('Error parsing JSON data:', e);
    }
});

