var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'duke4566',
	database: 'Bamazon_db'
});


connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
	managerInput();
});


function managerInput(){
	inquirer.prompt([{
		type: 'list',
		name: 'input',
		message: 'Can I help you find someting today?',
		choices: ['1) View Products for sale', '2) View low inventory', '3) Add to inventory', '4) Add new product']
	}]).then(function(answer){
		if(answer.input === '1) View Products for sale'){
			connection.query('SELECT * FROM products', function(err, res){
			if (err) throw err;
			console.log('');
			console.log('========================ITEMS IN STORE=======================');
			for(i=0;i<res.length;i++){
				console.log('Item ID:' + res[i].id);
				console.log('Product Name: ' + res[i].ProductName);
				console.log('Price: ' + '$' + res[i].Price);
				console.log('Quantity in Stock: ' + res[i].StockQuantity);
				console.log('---------------------');
			}
			console.log('')
			newTransaction();
			})
		}
		else if(answer.input === '2) View low inventory'){
			connection.query('SELECT * FROM products WHERE StockQuantity < 5', function(err, res){
				if (err) throw err;
				console.log('')
				console.log('========================LOW INVENTORY=======================');
				for(i=0;i<res.length;i++){
					console.log('Name: ' + res[i].ProductName);
					console.log('Product ID: ' + res[i].id);
					console.log('Quantity in Stock: ' + res[i].StockQuantity);
					console.log('---------------------');
				}
				newTransaction();
			})
		}
		else if(answer.input === '3) Add to inventory'){
			inquirer.prompt([{
				name: 'item',
				message: 'Enter the ID of the item you wish to update:',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			},{
				name: 'number',
				message: 'How many items would you like to buy?',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			}]).then(function(answer){
				connection.query('SELECT * FROM products WHERE id = ?', [answer.item], function(err, res){
						connection.query('UPDATE products SET ? Where ?', [{
							StockQuantity: res[0].StockQuantity + parseInt(answer.number)
						},{
							id: answer.item
						}], function(err, res){});
				})
				console.log('Inventory updated');
				newTransaction();
			})
		}
		else if(answer.input === '4) Add new product'){
			inquirer.prompt([{
				name: 'product',
				message: 'Enter name of product:'
			},{
				name: 'department',
				message: 'Enter a department for this product'
			},{
				name: 'price',
				message: 'Enter a price for this product',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			},{
				name: 'stock',
				message: 'Please enter a stock quantity for this product',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			}]).then(function(answer){
				connection.query('INSERT into products SET ?', {
					ProductName: answer.product,
					DepartmentName: answer.department,
					Price: answer.price,
					StockQuantity: answer.stock
				}, function(err, res){});
				console.log('Product Added');
				newTransaction();
			})
		}
	})
};


function newTransaction(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to make another transaction?'
	}]).then(function(answer){
		if(answer.choice){
			managerInput();
		}
		else{
			console.log('Thank you! Have a great day');
			connection.end();
		}
	})
}