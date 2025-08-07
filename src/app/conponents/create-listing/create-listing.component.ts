import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { group } from 'console';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/service/storage.service';
import { ChangeDetectorRef } from '@angular/core';
import { ListingService } from 'src/app/service/listing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  
  public createlisting : FormGroup ;
 
  

  constructor(private fb : FormBuilder, private storageService : StorageService ,  private cd: ChangeDetectorRef, private listingService : ListingService, private _snackbar : MatSnackBar , private router : Router) {

this.createlisting = this.fb.group({
  name : ['',Validators.required],
  description : ['', [Validators.required,Validators.maxLength(100),Validators.minLength(10)]],
  address : ['', Validators.required],
  type : ['sell', Validators.required],
  bedrooms : ['', Validators.required],
  bathrooms : ['', Validators.required],
  regularPrice:['', [Validators.required,Validators.min(1)]],
  discountPrice:['', [Validators.required,Validators.min(1)]],
  finalPrice : ['',[Validators.required,Validators.min(1)]],
  offer : [false, Validators.required],
  parking : [false, Validators.required],// idhar likhte h control ya no nice question kyoki humne alga se function bana rkaha h uska isliye ya 
  furnished : [false, Validators.required],
  imageUrls : [[], Validators.required],// adding the formcontrol haan to isko arr denge na apan ok
  userRef : [listingService.getUserID(), Validators.required]

},{
  validator: this.discountLessThanRegularValidator
})

this.createlisting.get('regularPrice')?.valueChanges.subscribe((value)=>{
  this.calculateFinalPrice(); // idhar validation lagana padega img ka? ruk sochne de suar

})


this.createlisting.get('discountPrice')?.valueChanges.subscribe((value)=>{


  this.calculateFinalPrice();


})

this.createlisting.get('offer')?.valueChanges.subscribe((value)=>{

  this.calculateFinalPrice();

})


}

  discountLessThanRegularValidator : ValidatorFn = (group : AbstractControl) : ValidationErrors | null => {


  let  reg = group.get('regularPrice')?.value;
  let dis = group.get('discountPrice')?.value;

  console.log("i am running");


  if (reg != null && dis != null && dis > reg) {
    return { priceError: true };
  }

 

return null;

  

  }

  calculateFinalPrice(){
    let finalPrice = 0; 
    let regularPrice = this.createlisting.get('regularPrice')?.value;
    let discount = this.createlisting.get('discountPrice')?.value;



  if(this.createlisting.get('offer')?.value == true){

    finalPrice = regularPrice - discount;
 this.createlisting.get('finalPrice')?.setValue(finalPrice); 
   }

   else{

    finalPrice = regularPrice;
    this.createlisting.get('finalPrice')?.setValue(finalPrice);
 
   }

    
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.files?.length , "length");
    if (!input.files || input.files.length === 0 ) { 
      return;
    }
    
    const file   = input.files; 

    console.log(file); 

if(input.files.length > 6 ){ 

  alert('You can select max 6 images ');
  return;
}
else  
  {

    let imagesToBeUploaded = this.createlisting.get('imageUrls')?.value.length + input.files.length; 
   
    console.log(this.createlisting.get('imageUrls')?.value.length , "else block lenght");
    if(imagesToBeUploaded > 6){
  alert('You can select max 6 images ');
  return;
    }
Array.from(input.files).forEach(element => {
 
  if (!element.type.startsWith('image/')   ) {
      alert('Please select an image file.'); 
      input.value = '';
      return;
    }
  let downloadURL = this.storageService.uploadImage(element, 'images'); 
 downloadURL.subscribe((url : string)=>{

   
  this.createlisting.get('imageUrls')?.setValue([...this.createlisting.get('imageUrls')?.value, url]) ;  
  this.cd.detectChanges();
 


   })


  });
    





 


    
  } 



}
  removeImg(item : number ){ 



let arr  = this.createlisting.get('imageUrls')?.value;
arr.splice(item,1); 
this.createlisting.get('imageUrls')?.setValue(arr);

this.cd.detectChanges();
//console.log(this.arr);
  }



 



  


  ngOnInit(): void {

  }
  

  submit(){


    if(this.createlisting.invalid){
      this.createlisting.markAllAsTouched();
     this.openSnackBar("Form Invalid");
      return;
    }

  let formValue = this.createlisting.value;

    formValue.discountPrice = formValue.finalPrice;

   console.log(formValue);
    // console.log(this.createlisting.get('userRef')?.value);

    this.listingService.createListing(formValue).subscribe((data)=>{  // always subscribe the http functions
                 
      console.log(data);
      


    })
    this.openSnackBar("Form Submitted");
    this.redirecttoHome();
    
    

   



  }
   openSnackBar(value : string )
    {
          //  let snackBarRef = this._snackbar.open(`${value}`);// haan aagaya isliye delet kiya haan tumne sikhaya aise

            this._snackbar.open(`${value}` , 'ok', {
  duration: 3000
});


    }
     redirecttoHome(){
     this.router.navigate(['/home']);

  }

}
