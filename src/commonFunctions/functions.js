export const getAllWarehouses = (data) => {
    var rows = [];
    var result = [];
    var allWarehouses = [];
    rows.push(data[0]['id']);
    result.push(data[0]);
 
    data.map(dataItem => { 
        if(!rows.includes(dataItem.id)) {
          rows.push(dataItem.id);
          result.push(dataItem);
        }
    });

    result.map(item => allWarehouses.push({name:item.map_name, id:item.id, comment: item.user_comment}));
    console.log("All Warehouses", allWarehouses);
    return allWarehouses;
};