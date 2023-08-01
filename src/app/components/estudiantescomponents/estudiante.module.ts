import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosEstudianteComponent } from './cursos-estudiante/cursos-estudiante.component';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CursosEstudianteComponent,
    HomeEstudianteComponent,
    PerfilEstudianteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CursosEstudianteComponent,
    HomeEstudianteComponent,
    PerfilEstudianteComponent
  ]
})
export class EstudianteModule { }
