import { NgModule, AfterViewInit, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
    { path: '' ,  redirectTo: '/home-page', pathMatch: 'full' },
    { path: 'login' , component: LoginComponent },
    { path: 'signup' , component: SignupComponent },
    { path: 'home-page' , component: HomePageComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  // providers: [{provide: APP_BASE_HREF, useValue: '/en/'}],
  exports: [RouterModule]
})
export class AppRoutingModule  {

}
