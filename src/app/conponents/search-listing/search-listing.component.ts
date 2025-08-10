import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/app/service/listing.service';
import { listing } from 'src/app/Model/listing.interface';

@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css']
})
export class SearchListingComponent implements OnInit {

  public searchArr : listing [] = [];
  public value : any;
  public furnishedState : boolean = false;
  public offerState : boolean = false;
  public parkingState : boolean = false;
  public typeState : string = '';
  public limit : any = 10;
public startIndex : any = 0;
public totalItems : any = 0;

  constructor(private activate : ActivatedRoute, private listingService : ListingService) { }

  ngOnInit(): void {
  this.activate.queryParams.subscribe(params =>{
    console.log(params );
    this.value = params['s'];
   this.refreshListing();

  })

  }

//   setActiveTabFurnished(furnishedState : any){

// this.furnishedState = !furnishedState;
// console.log(furnishedState);
// this.listingService.getlistingDetails(this.value,false,this.furnishedState).subscribe((data) =>{
// console.log(data);
// this.searchArr = data;
// })


//   }


refreshListing(){


 this.listingService.getlistingDetails(this.limit,this.startIndex,this.value, this.offerState, this.furnishedState,this.parkingState, this.typeState).subscribe((data) =>{
    this.totalItems = data.totalCount;
    this.searchArr = data.listings;
console.log(data);

  })




}

  setActiveTabOffer( x : any){
    

    switch(x) {
      

    case "2":
      this.furnishedState = !this.furnishedState;
      console.log(this.furnishedState);
      
      break;

    case "1":
      this.offerState = !this.offerState;
     
      break;
    case "3" :
      this.parkingState = !this.parkingState;
      
       break;
    
    case "4" :
      this.typeState = "sale";


      break;

    case "5" :
      this.typeState ="rent";

      break;

    case "6" :
      this.typeState ="lease";
      break;

    case "all" :
      this.typeState='';

  }
  console.log( this.typeState);

  this.refreshListing();
}

 fetchItems(event : any ){
this.limit = event.pageSize;
console.log(this.limit);
console.log(this.totalItems);
console.log(event.pageIndex);
this.startIndex = event.pageIndex * event.pageSize;
console.log("Here we are checking limit and start index", this.limit, this.startIndex);
 
this.refreshListing();
 } 


}
