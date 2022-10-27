import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Phone } from '../models/phone';
@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  httpClient = inject(HttpClient)
  constructor() { }

  getAll(): Observable<Phone[]> {
    return this.httpClient.get<Phone[]>('https://dummyjson.com/products').pipe(map(
      (phones: any) => {        
        return phones.products.slice(0, 5)
      }
    ))
  }
}
