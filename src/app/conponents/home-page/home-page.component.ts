import { Component, OnInit } from '@angular/core';
import { ListingService } from 'src/app/service/listing.service';
import { listing } from 'src/app/Model/listing.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public rentListingArray : listing [] = [];

  constructor(private listing : ListingService) { }

  ngOnInit(): void {
    
      this.listing.rentListing().subscribe((res)=>{
        this.rentListingArray = res;
        console.log(this.rentListingArray);
      });

      this.listing.saleListing().subscribe((res)=>{
       this.rentListingArray = res;

      })

      this.listing.offerListing().subscribe((res)=>{
        this.rentListingArray = res;
      })
    
  }

  

}
