export class Store {

  id: number;
  name: string;
  numberDaysCanReturnPurchase: number;

  constructor(
    id: number = 0,
    name: string = '',
    numberDaysCanReturnPurchase: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.numberDaysCanReturnPurchase = numberDaysCanReturnPurchase;
  }

}
