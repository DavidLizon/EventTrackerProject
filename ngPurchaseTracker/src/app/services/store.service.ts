import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private baseUrl = 'http://localhost:8083/';
  private url = 'api/stores';

  constructor(
    private http: HttpClient
  ) { }

  index(): Observable<Store[]>{
    return this.http.get<Store[]>(this.baseUrl + this.url).pipe(
      catchError((err: any) => {
       console.log(err);
       return throwError(
         () =>
         new Error('PurchaseService.index(): error retrieving purchase list: ' + err)
       );
      })
    )
   }

}
