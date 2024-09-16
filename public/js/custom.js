/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */
// Setup module
// ------------------------------

$(document).ready(function() {
    $('.chosen-select').chosen({
        placeholder_text_multiple: 'Select ',
        allow_single_deselect: true, // Allows deselection of single items
        no_results_text: 'No results matched', // Text for no results
        width: '100%', // Ensure the width matches the select element
        search_contains: true,
    });

    $(".chosen-select-single").chosen({width: "95%"}); 
});