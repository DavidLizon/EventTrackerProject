import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {

  private baseUrl = 'http://localhost:8083/';
  private url = this.baseUrl + 'api/purchases';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Purchase[]>{
   return this.http.get<Purchase[]>(this.url).pipe(
     catchError((err: any) => {
      console.log(err);
      return throwError(
        () =>
        new Error('PurchaseService.index(): error retrieving purchase list: ' + err)
      );
     })
   );
  }

  showPurchase(purchaseId: number): Observable<Purchase> {
    return this.http.get<Purchase>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error(
            'Purchase.showPurchase(): error retrieving purchase: ' + err
          )
        );
      })
    );
  }

  updatePurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(this.url + '/' + `${purchase.id}`, purchase).pipe(
      catchError((err: any) =>{
        console.log(err);
        return throwError(
          () => new Error('RunService.updateRun ERROR' + err)
        )
      })
    )
  }

  createPurchase(purchase: Purchase): Observable<Purchase> {
    purchase.store.id = 1;
    purchase.pastReturnDate = false;

    return this.http.post<Purchase>(this.url, purchase).pipe(
      catchError((err: any) => {
        console.error('PurchaseService.create(): error creating purchase: ');
        console.error(err);
        return throwError(
          () => {
            'PurchaseService.create(): error creating purchase: ' + err
          }
        );
      })
    );
  }

  deletePurchase(purchaseId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${purchaseId}`).pipe(
      catchError( (error: any) => {
        console.error('PurchaseService.delete(): error delieting purchase: ');
        console.error(error);
        return throwError(
          () => new Error(
            'PurchaseService.delete)(: error deleting purchase.'
          )
        );
      })
    );
  }

}
