import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cred } from '../Model/cred.interface.';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  


  signup ( data : cred  ): Observable<any> {

    return this.http.post<any>('http://localhost:3000/api/auth/signup',{
      "username" : data.username,
      "email" : data.email,
      "password" : data.password
    })
  



  }

  signIn(data : cred ) : Observable <any> {

    return this.http.post<any>('http://localhost:3000/api/auth/signin',{
      "email" : data.email,
      "password" : data.password
    })
 

  }


}
