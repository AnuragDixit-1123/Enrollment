import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
   
    { path: '' , component: HomePageComponent, pathMatch: 'full' },
    { path: 'login' , component: LoginComponent, pathMatch: 'full' },
    { path: 'signup' , component: SignupComponent, pathMatch: 'full' },
    { path: 'homePage' , component: HomePageComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}