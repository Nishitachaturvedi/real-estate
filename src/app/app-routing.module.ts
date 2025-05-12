import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomePageComponent } from './conponents/home-page/home-page.component';
import { CreateListingComponent } from './conponents/create-listing/create-listing.component';

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
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
