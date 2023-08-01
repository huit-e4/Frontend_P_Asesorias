import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosEstudianteComponent } from './cursos-estudiante/cursos-estudiante.component';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StudentgGuard } from 'src/app/guards/studentg.guard';
import { HomeStudentComponent } from '../home-student/home-student.component';

const routes: Routes = [
  {
    path: 'homestudent',
    component: HomeStudentComponent, children: [
      {
        path: '', 
        component: HomeEstudianteComponent,
       canActivate: [StudentgGuard] // child route component that the router renders
      },
      {
        path: 'cursos-estudiante', 
        component: CursosEstudianteComponent,
       canActivate: [StudentgGuard] 
      },
      {
        path: 'perfil-estudiante', 
        component: PerfilEstudianteComponent,
        canActivate: [StudentgGuard] 
      },

      {
        path:'**',
        redirectTo:''
      }
    ],
    canActivate: [StudentgGuard]

  },


]

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
    RouterModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CursosEstudianteComponent,
    HomeEstudianteComponent,
    PerfilEstudianteComponent
  ]
})
export class EstudianteModule { }
