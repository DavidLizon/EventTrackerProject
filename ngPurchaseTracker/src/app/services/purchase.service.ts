import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private baseUrl = 'http://localhost:8083/';
  private url = 'api/purchases';

  constructor(
    private http: HttpClient
  ) { }
}
