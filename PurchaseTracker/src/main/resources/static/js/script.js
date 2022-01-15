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
				displayPurchases(purchases);
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

function displayPurchases(purchases){
	
	console.log('in displayPurchases');
	
	let purchaseDiv = document.getElementById('purchaseList');
	purchaseDiv.textContent = '';

	for(let purchase of purchases) {
	let h4 = document.createElement('h4');
	h4.textContent = `Purchase ${purchase.id}: ${purchase.name}`;
	purchaseDiv.appendChild(h4);

	let ul = document.createElement('ul');
	purchaseDiv.appendChild(ul);

	let li = document.createElement('li');
	li.textContent = purchase.purchaseDate; 
	ul.appendChild(li);
	
	

	// for(let element in purchase) {

	// 	displaySinglePurchase(element);

	// 	if(element !== 'name' || element !== 'id'){
	// 	let li = document.createElement('li');
	// 	li.textContent = purchase[element];	
		
		// if( purchase[index].value === 'store'){
		// 	for(var store in index){
		// 		console.log('inside of store object')
		// 		let li2 = document.createElement('li');
		// 		li2.textContent = index[store];
		// 		ul.appendChild(li2);
		// 	}
		// }
		// to handle object do another for in check if p = store or something

		// let li3 = document.createElement('li');
		// li3.textContent = purchase[index].store;
		// ul.appendChild(li3);
		
	// 	ul.appendChild(li);
	// 	}
	// }
		//let li = document.createElement('li');
		//li.textContent = purchase.name;
		//ul.appendChild(li); 
	}
}
