/* ------------------------------------------------------------------------------
 *
 *  # Custom JS code
 *
 *  Place here all your custom js. Make sure it's loaded after app.js
 *
 * ---------------------------------------------------------------------------- */
// Setup module
// ------------------------------

// use for render table on views
function renderTable({ tableClassName, apiURl, columns }) {
  // Debugging log to ensure function is being called
  console.log("renderTable function executed");

  // Initialize DataTable
  $(document).ready(function () {
    $(tableClassName).DataTable({
      // Ajax setup to fetch data from API
      ajax: {
        url: apiURl,
        dataSrc: "data",
      },
      // Define the columns for the table
      columns: columns,

      // Configure table behavior
      autoWidth: false,
      columnDefs: [
        {
          // Example: Customize orderability and width of the first column
          orderable: true,
          width: 100,
          targets: [0], // Adjust the column index to fit your actual table columns
        },
      ],
      dom: '<"datatable-header"flB><"datatable-scroll"t><"datatable-footer"ip>',
      language: {
        search: '<span class="me-3">Filter:</span> <div class="form-control-feedback form-control-feedback-end flex-fill">_INPUT_<div class="form-control-feedback-icon"><i class="ph-magnifying-glass opacity-50"></i></div></div>',
        searchPlaceholder: 'Type to filter...',
        lengthMenu: '<span class="me-3">Show:</span> _MENU_',
        paginate: {
          first: 'First',
          last: 'Last',
          next: document.dir === "rtl" ? '&larr;' : '&rarr;',
          previous: document.dir === "rtl" ? '&rarr;' : '&larr;',
        },
      },
      // Make the table responsive
      responsive: true,
      scrollX: true,
      processing: true,
      serverSide: true,
      searching: true,
      paging: true,
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50, 100],
      ordering: true,
      order: [[0, 'asc']], // Default ordering on the first column
      info: true,
      search: {
        caseInsensitive: true,
      },
      // Buttons for exporting data and controlling columns
      buttons: [
        {
          extend: 'copyHtml5',
          className: 'btn btn-light',
          exportOptions: {
            columns: [0, ':visible'],
          },
        },
        {
          extend: 'excelHtml5',
          className: 'btn btn-light',
          exportOptions: {
            columns: ':visible',
          },
        },
        {
          extend: 'pdfHtml5',
          className: 'btn btn-light',
          exportOptions: {
            columns: [0, 1], // Adjust based on visible columns
          },
        },
        {
          extend: 'print',
          className: 'btn btn-light',
          exportOptions: {
            columns: ':visible',
          },
        },
        {
          extend: 'colvis',
          text: '<i class="ph-list"></i>',
          className: 'btn btn-primary btn-icon dropdown-toggle',
        },
      ],
    });
  });
}
