import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { AdmingGuard } from './guards/adming.guard';
import { HomeExpertComponent } from './components/home-expert/home-expert.component';
import { ExpertgGuard } from './guards/expertg.guard';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { StudentgGuard } from './guards/studentg.guard';
import { HomeadminComponent } from './components/admincomponents/homeadmin/homeadmin.component';
import { InstructoresComponent } from './components/admincomponents/instructores/instructores.component';
import { EstudiantesComponent } from './components/admincomponents/estudiantes/estudiantes.component';
import { CursosComponent } from './components/admincomponents/cursos/cursos.component';
import { PerfilComponent } from './components/admincomponents/perfil/perfil.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },

  {
    path: 'homeadmin',
    component: HomeAdminComponent, children: [
      {
        path: '', // child route path
        component: HomeadminComponent,
        //canActivate: [AdmingGuard] // child route component that the router renders
      },
      {
        path: 'instructores', 
        component: InstructoresComponent,
        //canActivate: [AdmingGuard] 
      },
      {
        path: 'estudiantes', 
        component: EstudiantesComponent,
        //canActivate: [AdmingGuard] 
      },
      {
        path: 'cursos', 
        component: CursosComponent,
        //canActivate: [AdmingGuard] 
      },
      {
        path: 'perfil', 
        component: PerfilComponent,
        //canActivate: [AdmingGuard] 
      },
      // {
      //   path:'**',
      //   redirectTo:'404NotFound',
      // }
      
    ],
    //canActivate: [AdmingGuard]

  },

  {
    path: 'homeexpert',
    component: HomeExpertComponent,
    canActivate: [ExpertgGuard]

  },

  {
    path: 'homestudent',
    component: HomeStudentComponent,
    canActivate: [StudentgGuard]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})


export class AppRoutingModule { }
