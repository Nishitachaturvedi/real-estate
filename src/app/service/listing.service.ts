import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http : HttpClient) {// mujhe ek cheez nai sajha  ki mai yaha url banaungi vo jayega backend mei right but whatabout beech ka data jo maine bana rkaha h
    // jaise form submit hone pr everything that is getting saved ya to mai usme data mtlb submit.value dungi? to form ka data save hoke backedn mei jayega
}
// ye homepage ki listing ki service h isme hi banadu createlisting ka?

rentListing() : Observable <any> {

return this.http.get <any>('http://localhost:3000/api/listing/get?type=rent&limit=10');

}


saleListing(): Observable<any> {

  return this.http.get <any> ('http://localhost:3000/api/listing/get?type=sale&limit=4');

}


offerListing() : Observable <any> {

  return this.http.get <any> ('http://localhost:3000/api/listing/get?offer=true&limit=4')
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

getlistingDetails(searchTerm : any, offer : any, furnished: any, parking : any, type:any) : Observable <any> {

  console.log(type , "HI");
  let urlSearchTerm = searchTerm? `searchTerm=${searchTerm}`: '';

  let offerUrl = offer ? `&offer=${offer}`:'';
  let furnishedUrl = furnished ? `&furnished=${furnished}`:'';

  let parkingState = parking ? `&parking=${parking}` : '';

  let typeState = type ? `&type=${type}` : '';



  return this.http.get <any> (`http://localhost:3000/api/listing/get?${urlSearchTerm}${offerUrl}${furnishedUrl}${parkingState}${typeState}`);
}

   }

