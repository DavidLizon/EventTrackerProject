console.log('script.js loaded');

window.addEventListener('load', function(e){
	console.log('document loaded');
	init();
});

function init() {
	console.log('In init');
	getStoresXML();
	getListPurchases();
	//TODO - setup event listeners for forms, etc.
}

function getListPurchases() {

	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/purchases/');

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				let purchases = JSON.parse(xhr.responseText);
				console.log('in onreadystate')
				displayAllPurchases(purchases);
			}
			else if (xhr.status === 404){
				console.log('Purchases not found.');
			} else {
				console.log('Error retrieving purchses: ' + xhr.status);
			}
	}
		}
	xhr.send();
};

function getPurchaseXML(purchaseId){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `api/purchase/${purchaseId}`);

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if (xhr.status === 200) {
				let purchase = JSON.parse(xhr.responseText);
				displayPurchase(purchase);
			} else if (xhr.status === 400) {
				displayError(`Purchase number: ${purhcaseId} does not exist`);
			} else {
				displayError('Error retreiving purchase: ' + xhr.status);
			}
		}
	}
	xhr.send();
}

// displayError(msg) {
// 	let purchaseDiv = document.getElementById('purchaseList');
// 	purchaseDiv.textContent = msg;
// };

function deletePurchaseXML(purchase){
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', `api/purchases/${purchase.id}`);

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status == 204) {
				// let purchase = JSON.parse(xhr.responseText);
				getListPurchases();
			} else if (xhr.status === 400) {
				displayError(`Purchase number: ${purhcaseId} does not exist`);
			} else {
				displayError('Error retreiving purchase: ' + xhr.status);
			}
		}
	}
	xhr.send();
}

function getStoresXML(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/stores/');

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if (xhr.status === 200) {
				let stores = JSON.parse(xhr.responseText);
				// displayStores(stores);
				// storeList = stores;
				returnStores(stores)
			} else if (xhr.status === 400) {
				displayError(`Stores do not exist`);
			} else {
				displayError('Error retreiving purchase: ' + xhr.status);
			}
		}
	}
	xhr.send();
}

function updatePurchaseXML(updatedPurchase){

	let xhr = new XMLHttpRequest();
	xhr.open('PUT', `api/purchase/${updatedPurchase.id}`);

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status == 201 ) {
				let purchase = JSON.parse(xhr.responseText);
				displayPurchase(purchase);
			} else if (xhr.status === 400) {
				displayError(`Purchase number: ${updatedPurchase} does not exist`);
			} else {
				displayError('Error retreiving purchase: ' + xhr.status);
			}
		}
	}
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(updatedPurchase));
}

function createPurchaseXML(newPurchase){

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/purchase/');

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status == 201 ) {
				let purchase = JSON.parse(xhr.responseText);
				displayPurchase(purchase);
			} else if (xhr.status === 400) {
				displayError(`Purchase number: ${newPurchase} does not exist`);
			} else {
				displayError('Error retreiving purchase: ' + xhr.status);
			}
		}
	}
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(newPurchase));
}

function displayAllPurchases(purchases){

	let purchaseDiv = document.getElementById('purchaseList');
	purchaseDiv.textContent = 'purchases made: ' + purchases.length;
	purchaseDiv.textContent = '';
	
	let create = document.createElement('input');
	create.type = 'submit';
	create.id = 'submitButton';
	create.value = 'New Purchase';
	purchaseDiv.appendChild(create);

	create.addEventListener('click', function(e) {
		e.preventDefault();

		getStoresXML();
		createPurchase();
		// displayStores(stores)

	});


	let table = document.createElement('table');
	table.id = 'purchaseDateTable';
	// document.body.appendChild(table);
	purchaseDiv.appendChild(table);

	for(let purchase of purchases) {

		
		// table head
		//  -------------------------------------------------------
		let tHead = document.createElement('thead');
		table.appendChild(tHead);

		let tr = document.createElement('tr');
		tHead.appendChild(tr);

		let th = document.createElement('th');
		th.textContent = purchase.purchaseDate;
		tHead.appendChild(th);

		//  -------------------------------------------------------
		let tBody = document.createElement('tbody');
		tBody.addEventListener('click', function(e){
			e.preventDefault();
			getPurchaseXML(purchase.id);
		});
		table.appendChild(tBody);

		tr = document.createElement('tr');
		tBody.appendChild(tr);

		// cell with order name
		td = document.createElement('td');
		td.id = 'orderNameTable';
		td.textContent = purchase.name;
		tBody.appendChild(td)

		// cell with store name
		td = document.createElement('td');
		td.id = 'storeNameTable';
		td.textContent = purchase['store']['name'];
		tBody.appendChild(td)
		
		if(purchase.returned) {
			td = document.createElement('td');
			td.id = 'returnedTable';
			td.textContent = 'Returned';
			tBody.appendChild(td)
		} else {	
			// if !online display Order Comlete, if en route display en route, 
			// if delivered display Items delivered
			td = document.createElement('td');
			td.id = 'statusTable';
			if(!purchase.online){
				td.textContent = 'Picked up'
			} else if (purchase.arrivalDate != null && purchase.delivered != true){
				td.textContent = 'Items en route';
			} else if (purchase.delivered) {
				td.textContent = 'Delivery completed';
			}
			tBody.appendChild(td);

			// new row for expected delivery date
			tr = document.createElement('tr');
			tBody.appendChild(tr);

			// blank for order name and store to span 2 rows
			td = document.createElement('td');
			tBody.appendChild(td)
			td = document.createElement('td');
			tBody.appendChild(td)
			

			// if shipped expected delivery date
			td = document.createElement('td');

			if(!purchase.online){
				td.textContent = `Completed: ${purchase.purchaseDate}`;
			} else if (purchase.arrivalDate != null) {
				if(purchase.delivered == true){
					td.textContent = 'Items delivered';
				} else {
					td.textContent = `Delivery date: ${purchase.arrivalDate}`;
				}
			}
			tBody.appendChild(td)

			// new row for return date
			tr = document.createElement('tr');
			tBody.appendChild(tr);

			// blank for order name and store to span 2 rows
			td = document.createElement('td');
			tBody.appendChild(td)
			td = document.createElement('td');
			tBody.appendChild(td)
			
			// cell with return date, calculate return date based on arrival date
			td = document.createElement('td');
			td.textContent = calcuateReturnDate(purchase);
			tBody.appendChild(td)

		}
	}
}

// calculate returnDate if shipped and delivered
function calcuateReturnDate(purchase){
	if(purchase['returnDate'] == null && purchase['delivered']) {
		let date = new Date(purchase['purchaseDate']);
		let daysToAdd = purchase['store']['numberDaysCanReturnPurchase'];
		let newDate = new Date(new Date().setDate(date.getDate() + daysToAdd ));
		// slice to show yyyy-MM-dd
		newDate = newDate.toJSON().slice(0, 10);
		purchase['returnDate'] = newDate;

		console.log('in calcuateReturnDate');
	}
}

function displayPurchase(purchase) {

	var todayDate = new Date().toJSON().slice(0, 10);
	
	let purchaseDiv = document.getElementById('purchaseList');
	purchaseDiv.textContent = '';

	let deletePurchase = document.createElement('input');
	deletePurchase.type = 'submit';
	deletePurchase.id = 'deleteButton';
	deletePurchase.value = 'Delete Purchase';
	purchaseDiv.appendChild(deletePurchase);

	deletePurchase.addEventListener('click', function(e) {
		e.preventDefault();

		deletePurchaseXML(purchase);

	});

	var update = document.createElement('button');
	update.id = 'updateButton';
	update.textContent = 'Update Purchase';
	purchaseDiv.appendChild(update);

	update.addEventListener('click', function(e) {
		e.preventDefault();

		updatePurchaseForm(purchase);
		getStoresXML();
	});

	let table = document.createElement('table');
	purchaseDiv.appendChild(table);

	let tHead = document.createElement('thead');
	table.appendChild(tHead);

	let tr = document.createElement('tr');
	tHead.appendChild(tr);

	// purchase date
	let th = document.createElement('th');
	th.textContent = purchase.purchaseDate;
	tHead.appendChild(th);

	// store name
	th = document.createElement('th');
	th.textContent = purchase['store']['name'];
	tHead.appendChild(th);

	// create table body
	let tBody = document.createElement('tbody');
	table.appendChild(tBody);

	// first row
	tr = document.createElement('tr');
	tBody.appendChild(tr);

	// online
	let td = document.createElement('td');
	if(purchase['online']){
		td.textContent = 'online';	
	} else {
		td.textContent = 'In store';
	}
	tBody.appendChild(td);

	// picked up/en route/delivered
	td = document.createElement('td');
	if(purchase['online']){
		if(purchase['arrivalDate'] >= todayDate ){
			td.textContent = 'En route';
		} else {
			td.textContent = 'Delivered';
		}
	} else {
		td.textContent = 'Pickup Complete';
	};
	tBody.appendChild(td);

	// create second row
	tr = document.createElement('tr');
	tBody.appendChild(tr);
	
	// purchase name
	td= document.createElement('td');
	td.textContent = purchase.name;
	tBody.appendChild(td);
	tBody.appendChild(td);

	//recived purchase
	td = document.createElement('td');
	if(!purchase.online){
		td.textContent = `Picked up: ${purchase.purchaseDate}`;
	} else if (purchase.online && purchase.delivered){
		td.textContent = 'Delivered on: ' + purchase['arrivalDate'];	
	}
	tBody.appendChild(td);
	
	// third row & blank cell
	tr = document.createElement('tr');
	tBody.appendChild(tr);
	td = document.createElement('td');
	tBody.appendChild(td);

	// return date
	td = document.createElement('td');
	if (purchase['returnDate'] == null) {
		td.textContent = calcuateReturnDate(purchase);	
	} 
	console.log('returnDate: ' + purchase['returnDate'] )
	console.log('todayDate: ' + todayDate )
	let comp = purchase['returnDate'] > todayDate;
	console.log('COMP return > today: ' + comp);

	if(purchase['returnDate'] < todayDate + 1){
		td.textContent = 'Past Return Date';
	} else {
		td.textContent = `Return by: ${purchase['returnDate']}`;
	}
	console.log('in return date')
	tBody.appendChild(td);	

		
	// maybe group online arrival and delivered together
	// display if online true
		
		// name
		// online
		// purchaseDate
		// arrivalDate
		// returnDate
		// delivered
		// returned
		// Home Depot
		// pastReturnDate
	
}


function updatePurchaseForm(purchase) {

	purchaseForm();

	let storeThing = purchase.store;
	console.log(storeThing);


	let updateForm = document.getElementById('updateForm');

	let name = document.getElementById('name');
	name.value = purchase.name;

	let online = document.getElementById('online');
	online.checked = purchase.online;

	let purchaseDate = document.getElementById('purchaseDate');
	purchaseDate.value = purchase.purchaseDate;

	let arrivalDate = document.getElementById('arrivalDate');
	arrivalDate.value = purchase.arrivalDate;

	let returnDate = document.getElementById('returnDate');
	returnDate.value = purchase.returnDate;

	let returned = document.getElementById('returned');
	returned.checked = purchase.returned;

	let delivered = document.getElementById('delivered');
	delivered.checked = purchase.delivered;




	label = document.createElement('label');
	label.for = 'store';
	label.textContent = 'Store: ';
 
	let select = document.createElement('select');
	select.id = 'stores';
	select.name = 'stores';
	select.onchange = 'updateStore';
	updateForm.appendChild(select);

	let option = document.createElement('option');
	// option.value = store['name'];
	// option.textContent = store['name'];
	option.value = 2;
	option.textContent = 'General Store';
	select.appendChild(option);

		// storeList
		// console.log('STORE LIST: ' + storeList);
		// console.log('STORE LIST.store: ' + storeList.store);
		for (let store in storeList) {
			// console.log('STORE: ' + store);
		}



	let submit = document.createElement('input');
	submit.type ='submit';
	submit.id = 'submitButton';
	submit.value = 'Submit';
	updateForm.appendChild(submit);

	submit.addEventListener('click', function(e){
		e.preventDefault();

		let f = updateForm;
		purchase.name = f.name.value;

		let cboxOnline = document.querySelector('#online');
		console.log('in SUBMIT: cbox ' + cboxOnline.checked)
		purchase.online = cboxOnline.checked;

		purchase.purchaseDate = f.purchaseDate.value;
		purchase.arrivalDate = f.arrivalDate.value;
		purchase.returnDate = f.returnDate.value;

		purchase.store.id = f.stores.value;
		console.log(storeThing);

		let cboxDelivered = document.querySelector('#delivered');
		purchase.delivered = cboxDelivered.checked;
		
		let cboxReturned = document.querySelector('#returned');
		purchase.returned = cboxReturned.checked;

		// purchase[store].id.value = 3;

		// test adding store







		// newPurchase[store][id] = '1';
		// let select = document.getElementById('stores');
		// let newStore = select[option];
		// console.log(newStore);


		// storeList
		// for (let store of storeList) {
		// 	console.log(store);
		// }

		updatePurchaseXML(purchase);
	});

	/*
		// name
		// online
		// purchaseDate
		// arrivalDate
		// returnDate
		// delivered
		// returned

		// store

	*/
};


function createPurchase() {

	purchaseForm();
	let updateForm = document.getElementById('updateForm');
	let name = document.getElementById('name');
	let online = document.getElementById('online');
	let purchaseDate = document.getElementById('purchaseDate');
	let arrivalDate = document.getElementById('arrivalDate');
	let returnDate = document.getElementById('returnDate');
	let returned = document.getElementById('returned');
	let delivered = document.getElementById('delivered');

	let submit = document.createElement('input');
	submit.type = 'submit';
	submit.id = 'submitButton';
	submit.value = 'Submit';
	updateForm.appendChild(submit);

	submit.addEventListener('click', function(e){

		let f = updateForm;
		let newPurchase = {};
		newPurchase.name = f.name.value;

		let cboxOnline = document.querySelector('#online');
		newPurchase.online = cboxOnline.checked;

		newPurchase.purchaseDate = f.purchaseDate.value;
		newPurchase.arrivalDate = f.arrivalDate.value;
		newPurchase.returnDate = f.returnDate.value;

		let cboxDelivered = document.querySelector('#delivered');
		newPurchase.delivered = cboxDelivered.checked;

		let cboxReturned = document.querySelector('#returned');
		newPurchase.returned = cboxReturned.checked;

		// test adding store

		createPurchaseXML(newPurchase);
		
	});
}

function purchaseForm() {

	let purchaseDiv = document.getElementById('purchaseList');
	purchaseDiv.textContent = '';

	let updateForm = document.createElement('form');
	updateForm.id = 'updateForm';
	purchaseDiv.appendChild(updateForm);

	// name
	let label = document.createElement('label');
	label.for = 'name';
	label.textContent = 'Name: ';
	updateForm.appendChild(label);

	let input = document.createElement('input');
	input.type = 'text';
	input.id = 'name'
	// input.value = purchase.name;
	updateForm.appendChild(input);

	let lineBreak = document.createElement('br');
	updateForm.appendChild(lineBreak);

	// store


	// online
	label = document.createElement('label');
	label.for = 'online';
	label.textContent = 'Online: ';
	updateForm.appendChild(label);

	input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'online';
	// input.checked = purchase.online;
	updateForm.appendChild(input);

	lineBreak = document.createElement('br');
	updateForm.appendChild(lineBreak);

	// purchaseDate
	label = document.createElement('label');
	label.for = 'purchaseDate';
	label.textContent = 'Purchased: ';
	updateForm.appendChild(label);

	input = document.createElement('input');
	input.type = 'text';
	input.id = 'purchaseDate';
	// input.value = purchase.purchaseDate;
	updateForm.appendChild(input);

	lineBreak = document.createElement('br');
	updateForm.appendChild(lineBreak);

	// arrivalDate
	label = document.createElement('label');
	label.for = 'arrivalDate';
	label.textContent = 'Arriving: ';
	updateForm.appendChild(label);

	input = document.createElement('input');
	input.type = 'text';
	input.id = 'arrivalDate';
	// input.value = purchase.arrivalDate;
	updateForm.appendChild(input);

	lineBreak = document.createElement('br');
	updateForm.appendChild(lineBreak);

	// returnDate
	label = document.createElement('label');
	label.for = 'returnDate';
	label.textContent = 'Return By: ';
	updateForm.appendChild(label);

	input = document.createElement('input');
	input.type = 'text';
	input.id = 'returnDate';
	// input.value = purchase.returnDate;
	updateForm.appendChild(input);

	lineBreak = document.createElement('br');
	updateForm.appendChild(lineBreak);

	// returned
	label = document.createElement('label');
	label.for = 'returned';
	label.textContent = 'Returned: ';
	updateForm.appendChild(label);

	input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'returned';
	// input.checked = purchase.returned;
	updateForm.appendChild(input);

	lineBreak = document.createElement('br');
	updateForm.appendChild(lineBreak);

	// delivered
	label = document.createElement('label');
	label.for = 'delivered';
	label.textContent = 'Delivered: ';
	updateForm.appendChild(label);

	input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'delivered';
	// input.checked = purchase.returned;
	updateForm.appendChild(input);

	lineBreak = document.createElement('br');
	updateForm.appendChild(lineBreak);
}

var storeList = {};

function returnStores(stores){
	storeList = stores;
	console.log('in returnStores')
	// console.log(storeList);	
	return stores;
}


function displayStores(stores){

	let purchaseDiv = document.getElementById('purchaseList');

	label = document.createElement('label');
	label.for = 'store';
	label.textContent = 'Store: ';
 
	let select = document.createElement('select');
	select.id = 'stores';
	select.onchange = 'updateStore';
	purchaseDiv.appendChild(select);

	for (let store of stores) {
		let option = document.createElement('option');
		option.value = store['name'];
		option.textContent = store['name'];
		select.appendChild(option);
	}

	function update(){
		var select = document.getElementById('option');
		var option = select.options[select.selectedIndex];
		console.log('store: ' + select.options[select.selectedIndex])
	}
	
};

