export class Store {

  id: number;
  name: string;
  numberDaysCanReturnPurchase: number;

  constructor(
    id: number = 1,
    name: string = '',
    numberDaysCanReturnPurchase: number = 1
  ) {
    this.id = id;
    this.name = name;
    this.numberDaysCanReturnPurchase = numberDaysCanReturnPurchase;
  }

}
