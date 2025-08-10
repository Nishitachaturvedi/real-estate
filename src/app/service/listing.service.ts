import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http : HttpClient) {
}


createListing(body : any) : Observable <any> {
  console.log("this is the post API running");

return this.http.post <any> ('http://localhost:3000/api/listing/create', body,{ withCredentials: true });


}
getListingById( id : any) : Observable <any> {

  return this.http.get <any> (`http://localhost:3000/api/listing/get/${id}`) ; 
}


getUserID () : any{

let userRef_detail : string | null = localStorage.getItem("user_detail");
        

    if(userRef_detail != null){
let  userRef = JSON.parse(userRef_detail);

 return userRef._id;

    }

}

getlistingDetails(limit:any, startIndex : any , searchTerm : any, offer : any, furnished: any, parking : any, type:any) : Observable <any> {

  console.log(type , "HI");

  let limitValue = limit ? `limit=${limit}`:'';  

  let startIndexValue = startIndex ? `&startIndex=${startIndex}`: '';

  let urlSearchTerm = searchTerm? `&searchTerm=${searchTerm}`: '';

  let offerUrl = offer ? `&offer=${offer}`:'';
  let furnishedUrl = furnished ? `&furnished=${furnished}`:'';

  let parkingState = parking ? `&parking=${parking}` : '';

  let typeState = type ? `&type=${type}` : '';



  return this.http.get <any> (`http://localhost:3000/api/listing/get?${limitValue}${startIndexValue}${urlSearchTerm}${offerUrl}${furnishedUrl}${parkingState}${typeState}`);
}




   }

