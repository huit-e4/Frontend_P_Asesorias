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
import { HomeadminComponent } from './components/admincomponents/homeadmin/homeadmin.component';
import { AdministradoresComponent } from './components/admincomponents/administradores/administradores.component';
import { InstructoresComponent } from './components/admincomponents/instructores/instructores.component';
import { TablaSolicitudesIComponent } from './components/admincomponents/tabla-solicitudes-i/tabla-solicitudes-i.component';
import { TablaInstructoresComponent } from './components/admincomponents/tabla-instructores/tabla-instructores.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeAdminComponent,
    HomeExpertComponent,
    HomeStudentComponent,
    HomeadminComponent,
    AdministradoresComponent,
    InstructoresComponent,
    TablaSolicitudesIComponent,
    TablaInstructoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



