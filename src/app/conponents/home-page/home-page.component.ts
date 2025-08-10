import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/service/listing.service';
import { listing } from 'src/app/Model/listing.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public rentListingArray : listing [] = [];
  public searchText : any;
  public limit : any = 4;
  

  constructor(private listing : ListingService, private router : Router) { }

  ngOnInit(): void {
    
      this.listing.getlistingDetails(this.limit,'','', '', '','','rent').subscribe((res)=>{
        this.rentListingArray = res.listings;
        console.log(this.rentListingArray);
      });

      this.listing.getlistingDetails(this.limit,'','', '', '','','sale').subscribe((res)=>{
       this.rentListingArray = res.listings;

      })

      this.listing.getlistingDetails(this.limit,'','', true, '','','').subscribe((res)=>{
        this.rentListingArray = res.listings;
        console.log(this.rentListingArray[0]._id, "this is the console");
      })
    
  }
routeToSearchListing(){
  this.router.navigate(
  ['/search-listing'],
  { queryParams: { s: this.searchText } }
);
}


  

}
