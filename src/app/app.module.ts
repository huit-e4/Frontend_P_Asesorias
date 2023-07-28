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
import { EstudiantesComponent } from './components/admincomponents/estudiantes/estudiantes.component';
import { CursosComponent } from './components/admincomponents/cursos/cursos.component';
import { InstructoresComponent } from './components/admincomponents/instructores/instructores.component';
import { AdministradoresComponent } from './components/admincomponents/administradores/administradores.component';
import { AsesoriasComponent } from './components/expercomponents/asesorias/asesorias.component';
import { CargarCvComponent } from './components/expercomponents/cargar-cv/cargar-cv.component';
import { InscripcionesComponent } from './components/expercomponents/inscripciones/inscripciones.component';
import { PerfilExpertComponent } from './components/expercomponents/perfil-expert/perfil-expert.component';
import { HomeExpertoComponent } from './components/expercomponents/home-experto/home-experto.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeAdminComponent,
    HomeExpertComponent,
    HomeStudentComponent,
    AdministradoresComponent,
    EstudiantesComponent,
    CursosComponent,
    InstructoresComponent,
    AdministradoresComponent,
    AsesoriasComponent,
    CargarCvComponent,
    InscripcionesComponent,
  
    PerfilExpertComponent,
        HomeExpertoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



