import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { group } from 'console';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  downloadURL: any;
  public createlisting : FormGroup ;

  constructor(private fb : FormBuilder, private storageService : StorageService) {

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
  parking : [false, Validators.required],
  furnished : [false, Validators.required],

},{
  validator: this.discountLessThanRegularValidator
})

this.createlisting.get('regularPrice')?.valueChanges.subscribe((value)=>{
  this.calculateFinalPrice();

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
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      input.value = '';
      return;
    }
  
    this.downloadURL= this.storageService.uploadImage(file, 'images');

   this.downloadURL.subscribe((url : string)=>{


    console.log(url);
   })
 
    
  }



  


  ngOnInit(): void {
  }

  submit(){
    console.log(this.createlisting);
  }

}
