console.log('script.js loaded');

window.addEventListener('load', function(e){
	console.log('document loaded');
	init();
});

function init() {
	console.log('In init');
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

// displayError(msg){
// 	let purchaseDiv = document.getElementById('purchaseList');
// 	purchaseDiv.textContent = msg;
// };

function displayAllPurchases(purchases){

	console.log('in displayPurchases');
	
	let purchaseDiv = document.getElementById('purchaseList');
	purchaseDiv.textContent = 'purchases made: ' + purchases.length;
	purchaseDiv.textContent = '';
	

	var table = document.createElement('table');
	// document.body.appendChild(table);
	purchaseDiv.appendChild(table);

	// let tBody = document.createElement('tBody');
	// table.appendChild(tBody);

	for(let purchase of purchases) {

		// table head
		//  -------------------------------------------------------
		let tHead = document.createElement('tHead');
		table.appendChild(tHead);

		let tr = document.createElement('tr');
		tHead.appendChild(tr);

		let th = document.createElement('th');
		th.id = 'purchaseDateTable';
		th.textContent = purchase.purchaseDate;
		tHead.appendChild(th);

		//  -------------------------------------------------------
		let tBody = document.createElement('tBody');
		tBody.addEventListener('click', function(e){
			e.preventDefault();
			getPurchase(purchase.id);
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
			// if !online display Orfer Comlete, if en route display en route, 
			// if delivered display Items delivered
			td = document.createElement('td');
			td.id = 'statusTable';
			if(!purchase.online){
				td.textContent = 'Items picked up'
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
			if(purchase['returnDate'] == null) {
				console.log('typeof: ' + typeof purchase['purchaseDate'] )
				let date = new Date(purchase['purchaseDate']);
				let daysToAdd = purchase['store']['numberDaysCanReturnPurchase'];
				let newDate = new Date(new Date().setDate(date.getDate() + daysToAdd ));
				td.textContent = `Return By: ${newDate}`;
			} else {
				td.textContent = `Return By: ${purchase['returnDate']}`;
			}
			tBody.appendChild(td)
		}
	}
}

function getPurchase(purchaseId) {
	

}
