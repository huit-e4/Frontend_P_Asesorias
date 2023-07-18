import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    PrincipalComponent,
    RegistroComponent,
    CAdministradorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './principal/principal.component';
import { RegistroComponent } from './registro/registro.component';
import { CAdministradorComponent } from './c-administrador/c-administrador.component';
