import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage }         from '@angular/fire/storage';
import { environment }  from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormControl, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { HomePageComponent } from './conponents/home-page/home-page.component';
import { MoneyPipePipe } from './pipes/money-pipe.pipe';
import { DatePipe } from '@angular/common';
import { CreateListingComponent } from './conponents/create-listing/create-listing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShowListingComponent } from './conponents/show-listing/show-listing.component';
import { SearchListingComponent } from './conponents/search-listing/search-listing.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomePageComponent,
    MoneyPipePipe,
    CreateListingComponent,
    ShowListingComponent,
    SearchListingComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    MatPaginatorModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(()    => getStorage()),
    BrowserAnimationsModule,
     DatePipe
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
