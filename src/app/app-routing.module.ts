import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomePageComponent } from './conponents/home-page/home-page.component';
import { CreateListingComponent } from './conponents/create-listing/create-listing.component';
import { ShowListingComponent } from './conponents/show-listing/show-listing.component';
import { SearchListingComponent } from './conponents/search-listing/search-listing.component';

const routes: Routes = [{
 path : 'signup',
 component : SignupComponent

},
{
  path : 'signin',
  component : SigninComponent
},
{
path : 'home',
component :  HomePageComponent

},
{
  path : 'create-listing',
  component : CreateListingComponent
},
{
  path : 'show-listing/:id',
  component : ShowListingComponent
},
{
 
  path : 'search-listing',
  component : SearchListingComponent

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
