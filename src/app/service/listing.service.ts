import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http : HttpClient) {
}


rentListing() : Observable <any> {

return this.http.get <any>('http://localhost:3000/api/listing/get?type=rent&limit=4');

}


saleListing(): Observable<any> {

  return this.http.get <any> ('http://localhost:3000/api/listing/get?type=sale&limit=4');

}


offerListing() : Observable <any> {

  return this.http.get <any> ('http://localhost:3000/api/listing/get?offer=true&limit=4')
} 

   }

