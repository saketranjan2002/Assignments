/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let category_map = new Map();

  for(let i=0;i<transactions.length;i++){
    if(category_map.has(transactions[i].category)){
      category_map.set(transactions[i].category,category_map.get(transactions[i].category)+transactions[i].price);
    }else{
      category_map.set(transactions[i].category,transactions[i].price);
    }
  }

  let list = [];
  for(const x of category_map.entries()){
    list.push({
      "category": x[0],
      "totalspent": x[1]
    });
  }
  return list;
}

console.log(calculateTotalSpentByCategory([ {
  id: 1,
  timestamp: 1656076800000,
  price: 10,
  category: 'Food',
  itemName: 'Pizza',
},{
  id: 2,
  timestamp: 2656076800000,
  price: 12,
  category: 'Food',
  itemName: 'Car',
}]))

module.exports = calculateTotalSpentByCategory;
