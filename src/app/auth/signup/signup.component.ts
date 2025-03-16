import { Component, OnInit } from '@angular/core';
import { cred } from 'src/app/Model/cred.interface.';
import { AuthService } from 'src/app/service/auth.service';





@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public credentials : cred = 
{
username: '',
email: '',
password: ''
}


  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  signup( data : cred){

    this.authService.signup(data).subscribe((res)=>{
      console.log(res);

    },
    (err)=>{
                window.alert(err.status == 500 ? "Credentials already exists" : "something went wrong");
    });

  



  }

}
