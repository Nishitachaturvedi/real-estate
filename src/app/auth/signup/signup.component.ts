import { Component, OnInit } from '@angular/core';
import { cred } from 'src/app/Model/cred.interface.';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

 public  signUpForm : FormGroup;

  public credentials : cred = 
{
username: '',
email: '',
password: ''
}


  constructor(private authService : AuthService, private fb : FormBuilder,private router : Router) { 
 this.signUpForm = this.fb.group({

  username : ['',Validators.required],
  email : ['', [Validators.email,Validators.required]],
  password : ['', Validators.required]

 })

  }

  ngOnInit(): void {
  }

  signup(){

    this.authService.signup(this.signUpForm.value).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/signin']);

    },
    (err)=>{
                window.alert(err.status == 500 ? "Credentials already exists" : "something went wrong");
    });

  



  }
  redirectSignin(){
     this.router.navigate(['/signin']);

  }


}
