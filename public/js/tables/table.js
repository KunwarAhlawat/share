// const DatatableDataSources = function() {

//   // Parse and return data
//   const fetchData = function() {
//     const rawData = $("#data").text().trim();

//     let parsedData;
//     try {
//       parsedData = JSON.parse(rawData);
//       const { data, label } = parsedData;

//       if (!Array.isArray(data)) {
//         console.error("Data is not an array:", data);
//         return { data: [], label }; // Return empty array if data is not valid
//       }

//       console.log("Data:", data);
//       console.log("Label:", label);
//       return { data, label };
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       return { data: [], label: null }; // Return empty array if parsing fails
//     }
//   };

 
//   // Setup module components
//   const _componentDatatableDataSources = function() {
//     if (!$().DataTable) {
//       console.warn('Warning - datatables.min.js is not loaded.');
//       return;
//     }
   
//     const { data, label } = fetchData();
//     console.log("Data:", data);
//     console.log("Label:", label);
    
  
//     // Define columns based on label
//     const columns = [];

//     if (label === "firms") {
//       columns.push(
//         { data: "firmName" },
//         { data: "address" },
//         { data: "pincode" },
//         { data: "GSTNumber" },
//         { data: "accountNumber" },
//         { data: "bankName" },
//         { data: "IFSCcode" },
//         { data: "ProductProduced" },
//         {
//           data: null,
//           className: "text-center",
//           render: function (data, type, row) {
//               // Serialize the row object to JSON string
               
//             //  console.log("From Table .js ", row)
//                 return `
//                   <button type="button" class="btn btn-primary btn-sm" 
//                           onclick="setEditFirmData('${row.firmId}')">
//                       <i class="ph ph-pencil"></i>
//                   </button>
//                   <button type="button" class="btn btn-danger btn-sm ms-2" 
//                           onclick="setDeleteFirmData('${row.firmId}')">
//                       <i class="ph ph-trash"></i>
//                   </button>
//               `;
//           }
//       }
//     );
    
//     } else if (label === "customers") {
//       columns.push(
//         { data: "customerCode" },
//         { data: "customerName" },
//         { data: "master_categories",
//           render: function(data) {
//             if (Array.isArray(data)) {
//               return data.map(item => item.categoriesType).join(', ');
//             }
//             return '';
//           }
//         },
//         { data: "area", 
//           render: function(data) {
//             if (Array.isArray(data)) {
//               return data.map(item => item.area).join(', ');
//             }
//             return '';
//           }
//         },
//         { data: "CustomerStatus" },
//         { data: "grade" , 
//           render: function(data) {
//             if (Array.isArray(data)) {
//               return data.map(item => item.gradeType).join(', ');
//             }
//             return '';
//           }
//         },
//         { data: "pincode" }
//       );
//     } else if (label === "areas"){
//       columns.push(
//         { data: "area" },
//         { data: "district" },
//         { data: "zone" },
//         { data: "state" },
//         {
//           data: null,
//           className: "text-center",
//           render: function (data, type, row) {
//               // Serialize the row object to JSON string
               
//             //  console.log("From Table .js ", row)
//                 return `
//                   <button type="button" class="btn btn-primary btn-sm" 
//                           onclick="setEditAreaData('${row.areaId}')">
//                       <i class="ph ph-pencil"></i>
//                   </button>
//                   <button type="button" class="btn btn-danger btn-sm ms-2" 
//                           onclick="setDeleteAreaData('${row.areaId}')">
//                       <i class="ph ph-trash"></i>
//                   </button>
//               `;
//           }
//       }
//       );
//     }else if (label === "categories"){
//       columns.push(
//         { data: "categoriesType" },
//       );
//     }else if (label === "grades"){
//       columns.push(
//         { data: "gradeType" },
//       );
//     }
//     else if (label === "products"){
//       columns.push(
//         { data: "productName" },
//         { data: "productGroups" ,
//           render: function(data) {
//             if (Array.isArray(data)) {
//               return data.map(item => item.productGroup).join(', ');
//             }
//             return '';
//           }
//         },
//       );
//     } else if (label === "product-groups"){
//       columns.push(
//         { data: "productGroup"},
//         {data:"products",
//           render: function(data) {
//             if (Array.isArray(data)) {
//               return data.map(item => item.productName).join(', ');
//             }
//             return '';
//           }
//          },
//       );
//     }else if (label === "employees"){
//       columns.push(
//         { data: "employeeName" },
//         { data: "designation" },
//         { data: "primaryMobileNumber" },
//         { data: "emailId" },
//         { data: "gender" },
//         { data: "dateOfBirth" },
//         { data: "bloodGroup" },
//         { data: "address" },
//         { data: "fatherName" },
//         { data: "motherName" },
//         { data: "bankName" },
//         { data: "bankAccountNumber" },
//         { data: "ifscCode" },
//         { data: "aadharNumber" },
//         { data: "panNumber" },
//         { data: "dateOfJoining" },
//         { data: "dateOfLeaving" },
//         { data: "reference" },
//         { data: "referenceContactNumber" },
//         {
//           data: null,
//           className: "text-center",
//           render: function (data, type, row) {
//               // Serialize the row object to JSON string
               
//             //  console.log("From Table .js ", row)
//                 return `
//                   <button type="button" class="btn btn-primary btn-sm" 
//                           onclick="setEditEmployeeData('${row.empId}')">
//                       <i class="ph ph-pencil"></i>
//                   </button>
//                   <button type="button" class="btn btn-danger btn-sm ms-2" 
//                           onclick="setDeleteEmployeeData('${row.empId}')">
//                       <i class="ph ph-trash"></i>
//                   </button>
//               `;
//           }
//       }
//       );
//     }
    

//     // Check if DataTable is already initialized and destroy if so
//     if ($('.datatable-nested').DataTable().settings().length) {
//       $('.datatable-nested').DataTable().destroy();
//     }

//   // Setting datatable defaults
//   $.extend( $.fn.dataTable.defaults, {
//     autoWidth: false,
//     columnDefs: [{ 
//         orderable: true,
//         width: 100,
//         targets: [ 5 ]
//     }],
//     dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
//     language: {
//         search: '<span class="me-3">Filter:</span> <div class="form-control-feedback form-control-feedback-end flex-fill">_INPUT_<div class="form-control-feedback-icon"><i class="ph-magnifying-glass opacity-50"></i></div></div>',
//         searchPlaceholder: 'Type to filter...',
//         lengthMenu: '<span class="me-3">Show:</span> _MENU_',
//         paginate: { 'first': 'First', 'last': 'Last', 'next': document.dir == "rtl" ? '&larr;' : '&rarr;', 'previous': document.dir == "rtl" ? '&rarr;' : '&larr;' }
//     }
// });




//     // Debugging: Check the final configuration before initializing DataTable
//     console.log("Columns:", columns);

//     // Initialize DataTable
//     $('.datatable-nested').DataTable({
//       data: data,
//       buttons: [
//         {
//           extend: 'copyHtml5',
//           className: 'btn btn-light',
//           exportOptions: {
//             columns: [0, ':visible']
//           }
//         },
//         {
//           extend: 'excelHtml5',
//           className: 'btn btn-light',
//           exportOptions: {
//             columns: ':visible'
//           }
//         },
//         {
//           extend: 'pdfHtml5',
//           className: 'btn btn-light',
//           exportOptions: {
//             columns: [0, 1, 2, 5]
//           }
//         },
//         {
//           extend: 'print',
//           className: 'btn btn-light',
//           exportOptions: {
//             columns: ':visible'
//           }
//         },
//         {
//           extend: 'colvis',
//           text: '<i class="ph-list"></i>',
//           className: 'btn btn-primary btn-icon dropdown-toggle'
//         }
//       ],
//       columns: columns,
//       responsive: true, // Enable responsive behavior
//       scrollX: true, // Enable horizontal scrolling
//       autoWidth: true
//     });
    
//   };

//   // Return objects assigned to module
//   return {
//     init: function() {
//       _componentDatatableDataSources();
//     }
//   };
// }();

// // Initialize module
// document.addEventListener('DOMContentLoaded', function() {
//   DatatableDataSources.init();
// });
