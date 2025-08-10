import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from 'src/app/service/listing.service';


@Component({
  selector: 'app-show-listing',
  templateUrl: './show-listing.component.html',
  styleUrls: ['./show-listing.component.css']
})
export class ShowListingComponent implements OnInit {
public id : any;
public listingDetails : any = null;
public mainImage : any 
public priceOff : any;




  constructor(private activatedRoute : ActivatedRoute, private listingService : ListingService) { 

  }

  ngOnInit(): void {

    this.getlistingByID();

  this.listingService.getListingById(this.id).subscribe((item) =>{

this.listingDetails = item;
console.log(this.listingDetails);
this.mainImage = this.listingDetails?.imageUrls[0]

    
  })
  }

  getlistingByID(){
  this.id  = this.activatedRoute.snapshot.params['id'];
  }

mainImageFunction( url : any){
  
this.mainImage = url;



}

showRightImg( url : any){
let existing =  this.listingDetails.imageUrls.indexOf(url);
let length = this.listingDetails.imageUrls.length;




if(existing < length-1 ){

this.mainImage = this.listingDetails.imageUrls[existing+1];


}
else{

  this.mainImage = this.listingDetails.imageUrls[0];

}



//console.log(existing);

}

showLeftImg( url : any){
let existing =  this.listingDetails.imageUrls.indexOf(url);



if(existing >0){

this.mainImage = this.listingDetails.imageUrls[existing-1];

//console.log(existing);

}
else{

  let length = this.listingDetails.imageUrls.length -1;

  this.mainImage = this.listingDetails.imageUrls[length];
  
}


}

calculatePercentOff(){


  this.priceOff = (this.listingDetails.regularPrice - this.listingDetails.discountPrice)/this.listingDetails.regularPrice;
  this.priceOff = (this.priceOff*100);
  return this.priceOff;


}






  

}




