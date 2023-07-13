import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
 // {path: "login", component: AppComponent, pathMatch: "full"},
 { path: 'login', component: LoginComponent },
 { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
