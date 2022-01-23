import { Pipe, PipeTransform } from '@angular/core';
import { Purchase } from '../models/purchase';

@Pipe({
  name: 'pastReturnDate'
})
export class PastReturnDatePipe implements PipeTransform {

  transform(purchases: Purchase[], showAll?: boolean): Purchase[] {
    let results: Purchase[] = [];

    if(showAll) {
      return purchases;
    }

    for (let i = 0; i < purchases.length; i++) {
      if(!purchases[i].pastReturnDate) {
        results.push(purchases[i]);
      }
    }
    return results;
  }

}
