import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeExpertComponent } from './components/home-expert/home-expert.component';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AdminModule } from './components/admincomponents/admin.module';
import { ExpertModule } from './components/expercomponents/expert.module';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeAdminComponent,
    HomeExpertComponent,
    HomeStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module,
    HttpClientModule,
    CommonModule,
    AdminModule,
    ExpertModule,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



