import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public signIn : FormGroup



  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router) { 



    this.signIn =  this.fb.group ({

      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  signin(){

    this.authService.signIn(this.signIn.value).subscribe((res)=>{
        let x = res.message;
        window.alert(x);
      
    })

  }

  redirectSignUp(){
    this.router.navigate(['/signup']);
  }

  

}
