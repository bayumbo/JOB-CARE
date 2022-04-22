import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestResetComponent } from './recuperarContraseña/request-reset/request-reset.component';
import { ResponseResetComponent } from './recuperarContraseña/response-reset/response-reset.component';


const routes: Routes = [
 

  //Rutas de inicio

  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
 
  {path: 'request-reset-password', component: RequestResetComponent},
  { path: 'response-reset-password/:token', component: ResponseResetComponent},



];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes, )
  ],
  exports:[ RouterModule]
})
export class AuthRoutingModule { }
