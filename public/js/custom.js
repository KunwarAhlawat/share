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

// Function to show success toast
function showSuccessToast(message) {
  // Create the toast element
  const toastHTML = `
    <div class="toast align-items-center text-bg-success border-0 position-fixed" style="top: 20px; right: 20px; z-index: 1055;" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  // Append the toast directly to the body
  document.body.insertAdjacentHTML('beforeend', toastHTML);

  // Get the last toast that was added to the body
  const successToast = document.body.lastElementChild;

  // Initialize and show the toast
  const bootstrapToast = new bootstrap.Toast(successToast);
  bootstrapToast.show();

  // Remove the toast after it has been shown for a specific duration
  setTimeout(() => {
    bootstrapToast.dispose(); // Clean up the toast instance
    successToast.remove();    // Remove the toast element from the DOM
  }, 3000); // Adjust the duration (in milliseconds) as needed
}


// Function to show delete confirmation modal
function showDeleteConfirmationModal(name, callback) {
  // Create the modal HTML
  const modalHTML = `
    <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete: <strong>${name}</strong>?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append the modal to the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Initialize the modal
  const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));

  // Show the modal
  deleteModal.show();

  // Attach event listener for confirmation button
  document.getElementById('confirmDeleteBtn').onclick = function() {
    // Invoke the callback to delete the item
    callback();

    // Remove the modal from the DOM
    deleteModal.hide();
    document.getElementById('deleteConfirmationModal').remove(); // Clean up the modal element
  };

  // Cleanup modal when closed
  deleteModal._element.addEventListener('hidden.bs.modal', function() {
    deleteModal.dispose();
    document.getElementById('deleteConfirmationModal').remove(); // Remove the modal from DOM
  });
}


// Utility function to handle AJAX requests
function ajaxRequest(url, type, data, successCallback, errorCallback) {
  let ajaxSettings = {
      url: url,
      type: type,
      success: successCallback,
      error: errorCallback
  };

  // Check if data is a FormData object, adjust processData and contentType accordingly
  if (data instanceof FormData) {
      ajaxSettings.data = data;
      ajaxSettings.processData = false; // Prevent jQuery from processing the FormData
      ajaxSettings.contentType = false; // Prevent jQuery from setting the content type header
  } else {
      ajaxSettings.data = data;
      ajaxSettings.processData = true;
      ajaxSettings.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
  }

  // Perform the AJAX request
  $.ajax(ajaxSettings);
}