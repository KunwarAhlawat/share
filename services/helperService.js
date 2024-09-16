// these are some helper function 

// Use for get master prefix tables id form customer prefix table
const getIdFromCustomersPrefixTable =  function(array, id) {
  const result = [];
  for (const item of array) {
    // console.log("From linear search cusotmer Id", item.customerId)
    // console.log("From linear search Id", id)
    if (item.customerName === id) {
      result.push(item);
    }
  
  }

  // console.log("from linearsearch function  ", result)
  //  console.log("from linearsearch function type  ", Array.isArray(result) )
  return result; // id not found
}

// Use for get data form master prefix table 
const getDataFromMasterPrefixTable = function(array, ids, op=null) {
  const result = []; // Initialize the result array
  // console.log("From linear2 - ids", ids)
  // Check which property is present in the ids object and process accordingly
  if (op==="category") {
      // Create a Set of categories for fast lookup
      const categoriesSet = new Set(ids.map(id => id.category));
      // Iterate over each item in the array
      for (const item of array) {
          // Check if the current item's categoriesId is in the categoriesSet
          if (categoriesSet.has(item.categoriesId)) {
              result.push(item); // Add matching items to the result array
          }
      }
  } else if (op==="firm") {
      // Create a Set of firms for fast lookup
      const firmSet = new Set(ids.map(id => id.firm));
      // Iterate over each item in the array
      for (const item of array) {
          // Check if the current item's firmId is in the firmSet
          if (firmSet.has(item.firmId)) {
              result.push(item); // Add matching items to the result array
          }
      }
  } else if (op==="product") {
      // Create a Set of products for fast lookup
      const productSet = new Set(ids.map(id => id.product));
      // Iterate over each item in the array
      for (const item of array) {
          // Check if the current item's productId is in the productSet
          if (productSet.has(item.productId)) {
              result.push(item); // Add matching items to the result array
          }
      }
  } else if (op==="area") {
    // Iterate over each item in the array
    for (const item of array) {
        // Check if the current item's productId is in the productSet
        // console.log("From linear2 item.areaId",typeof item.areaId)
        if (ids===(item.areaId)) {
         
            result.push(item); // Add matching items to the result array
        }
    }
} else if (op==="grade") { 
  // Iterate over each item in the array
  for (const item of array) {
      // Check if the current item's productId is in the productSet
      // console.log("From linear2 item.areaId",typeof item.areaId)
      if (ids===(item.gradeId)) {
       
          result.push(item); // Add matching items to the result array
      }
  }
} 
  else {
      // Return null if no valid criteria are found
      return null;
  }

  // Return the result array
  return result;
}

// use for get data form id(products, product-groups)
const getDataById = function(id, data, op) {
    // console.log("Product Group Id",id);
    // Iterate over each object in the data array
    if(op==="product-groups"){ 
        for (const item of data) {
        // Check if the item's id is in the productGroup array
        if (id===item.productGroup) {
            console.log("Form GetDataByID", item);
            return item;
        }
    }
} else if(op==="products"){ 
    for (const item of data) {
    // Check if the item's id is in the productGroup array
    if (id===item.id) {
        console.log("Form GetDataByID", item);
        return item;
    }
}
}
   
    
    // If no match is found, handle this case
    console.log("No matching data found");
    return null;
};



module.exports =  {
  getIdFromCustomersPrefixTable,
  getDataFromMasterPrefixTable,
  getDataById
}