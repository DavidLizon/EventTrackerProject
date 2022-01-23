import { Store } from "./store";

export class Purchase {
  id: number;
  name: string;
  online: boolean;
	purchaseDate: string;
	arrivalDate: string;
	returnDate: string;
	delivered: boolean;
	returned: boolean;
	pastReturnDate: boolean;
  store: Store = new Store();

  constructor(
    id: number = 0,
    name: string = '',
    online: boolean = false,
    purchaseDate: string = '',
    arrivalDate: string = '',
    returnDate: string = '',
    delivered: boolean = false,
    returned: boolean = false,
    pastReturnDate: boolean = false,
    store: Store = new Store()
  ) {
    this.id = id;
    this.name = name;
    this.online = online;
    this.purchaseDate = purchaseDate;
    this.arrivalDate = arrivalDate;
    this.returnDate = returnDate;
    this.delivered = delivered;
    this.returned = returned;
    this.pastReturnDate = pastReturnDate;
    this.store = store;
  }

}
