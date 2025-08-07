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

  constructor(private activate : ActivatedRoute, private listingService : ListingService) { }

  ngOnInit(): void {
  this.activate.queryParams.subscribe(params =>{
    console.log(params );
    this.value = params['s'];
    this.listingService.getlistingDetails(this.value,false,false,false,'').subscribe((data) =>{
     
     // console.log(data);
      this.searchArr = data;

    })

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


  }
  console.log( this.typeState);

  this.listingService.getlistingDetails(this.value, this.offerState, this.furnishedState,this.parkingState, this.typeState).subscribe((data) => {
    
        console.log(data);
        this.searchArr = data;
      });
}

  


}
