var fs = require('fs');

// exports.getPosts = (req, res) => {
// 	var contents = fs.readFileSync("data/inventory.json");

// 	var jsonContent = JSON.parse(contents);
// 	res.json(jsonContent);
// }

exports.product = (req, res) => {
	var contents = fs.readFileSync("data/inventory.json");
	var jsonContent = JSON.parse(contents);
	var arrayOfProduct = [];
	
	for (var i = 0; jsonContent[i]; i++){
		var productId = jsonContent[i]["product_id"];
		var productName = jsonContent[i]["product_name"];

		var newProduct = {
			productId: productId,
			productName: productName
		}
		arrayOfProduct.push(newProduct)
	}
	res.json(arrayOfProduct);
}

exports.inventoryById = (req, res) => {
	var contents = fs.readFileSync("data/inventory.json");
	var jsonContent = JSON.parse(contents);

	id = req.params.id
	res.json(jsonContent[id].inventory)
}

// exports.labelById = (req, res) => {
// 	var contents = fs.readFileSync("data/inventory.json");
// 	var jsonContent = JSON.parse(contents);

// 	id = req.params.id
// 	res.json(jsonContent[id].product_name)
// }




// exports.postAddProduct = (req, res) => { 
// 	const post = req.body;
// 	var contents = fs.readFileSync("data/inventory.json");
// 	var jsonContent = JSON.parse(contents);
// 	var index = 0;


// 	while(jsonContent[index])
// 		index++;

// 	jsonContent[index] = post;
// 	var newJson = JSON.stringify(jsonContent);

// 	fs.writeFileSync("data/inventory.json", newJson,'utf8', function(err) {
// 		if(err){
// 			console.log("ERROR!");
// 			return console.log(err);
// 		}
// 	})
// }

exports.postAddDayStock = (req, res) => {
	const post = req.body;
	var dataFile = fs.readFileSync("data/inventory.json");
	var dataFileParsed = JSON.parse(dataFile);
	var index = 0;

	while(post.product_name != dataFileParsed[index].product_name
		|| post.product_id != dataFileParsed[index].product_id)
			index++;
	if(post.product_name === dataFileParsed[index].product_name
		|| post.product_id === dataFileParsed[index].product_id)
		{
			let i = 0;
			while (dataFileParsed[index].inventory[i])
			{
				if (dataFileParsed[index].inventory[i].date == post.inventory[0].date)
					break
				i++
			}
			if (!dataFileParsed[index].inventory[i])
				dataFileParsed[index].inventory.push(post.inventory[0])
			else{
				dataFileParsed[index].inventory[i].quantity = post.inventory[0].quantity
			}
			var newJson = JSON.stringify(dataFileParsed);
			fs.writeFileSync("data/inventory.json", newJson,'utf8', function(err) {
				if(err){
					console.log("ERROR!");
					return console.log(err);
				}
			})
		}
	else
		console.log("No product with this name or ID");	
	res.status(200).send({
		message: "New data"
	});
}

 