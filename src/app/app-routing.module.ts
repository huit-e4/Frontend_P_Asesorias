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
import { InstructoresComponent } from './components/admincomponents/instructores/instructores.component';
import { EstudiantesComponent } from './components/admincomponents/estudiantes/estudiantes.component';
import { CursosComponent } from './components/admincomponents/cursos/cursos.component';
import { HomeadminComponent } from './components/admincomponents/homeadmin/homeadmin.component';
import { AdministradoresComponent } from './components/admincomponents/administradores/administradores.component';
//import { HomeComponent } from './components/expercomponents/home/home.component';
import { CargarCvComponent } from './components/expercomponents/cargar-cv/cargar-cv.component';
import { AsesoriasComponent } from './components/expercomponents/asesorias/asesorias.component';
import { InscripcionesComponent } from './components/expercomponents/inscripciones/inscripciones.component';
import { PerfilAComponent } from './components/admincomponents/perfil-a/perfil-a.component';
import { PerfilExpertComponent } from './components/expercomponents/perfil-expert/perfil-expert.component';
import { HomeExpertoComponent } from './components/expercomponents/home-experto/home-experto.component';


import { TablaSolicitudesIComponent } from './components/admincomponents/tabla-solicitudes-i/tabla-solicitudes-i.component';
import { TablaInstructoresComponent } from './components/admincomponents/tabla-instructores/tabla-instructores.component';

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
        path: '', 
        component: HomeadminComponent,
       // canActivate: [AdmingGuard] // child route component that the router renders
      },
      {
        path: 'instructors', 
        component: InstructoresComponent, children:[
          { path: '', 
           component: TablaInstructoresComponent,
           // canActivate: [AdmingGuard]
          },
           {
           path: 'aprsolicitudes', 
          component: TablaSolicitudesIComponent,
         // canActivate: [AdmingGuard]
       }
         ],
       // canActivate: [AdmingGuard] 
      },
      {
        path: 'estudiantes', 
        component: EstudiantesComponent,
       // canActivate: [AdmingGuard] 
      },
      {
        path: 'cursos', 
        component: CursosComponent,
       // canActivate: [AdmingGuard] 
      },
      {
        path: 'perfil', 
        component: PerfilAComponent,
        //canActivate: [AdmingGuard] 
      },
      {
        path: 'administrators', 
        component: AdministradoresComponent,
       // canActivate: [AdmingGuard] 
      },
      {
        path:'**',
        redirectTo:''
      }
    ],
    //canActivate: [AdmingGuard]

  },

  {
    path: 'homeexpert',
    component: HomeExpertoComponent, children: [
      {
        path: '', 
        component: HomeExpertComponent,
        canActivate: [ExpertgGuard] 
      },
      {
        path: 'subirCv', 
        component: CargarCvComponent,
        canActivate: [AdmingGuard] 
    },
      {
        path: 'perfil', 
        component: PerfilExpertComponent,
        canActivate: [AdmingGuard] 
      },
  
      {
        path: 'alumnos', 
        component: AsesoriasComponent,
        canActivate: [AdmingGuard] 
      },
      {
        path: 'Asesoria', 
        component: AsesoriasComponent,
        canActivate: [AdmingGuard] 
      },
     
      {
        path: 'salir', 
        component: LoginComponent,
        canActivate: [AdmingGuard] 
      },
      {
        path: 'inscritos', 
        component: InscripcionesComponent,
        canActivate: [AdmingGuard] 
      },
      {
        path:'**',
        redirectTo:''
      }
    ],
    canActivate: [ExpertgGuard]
    

  },

 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})


export class AppRoutingModule { }
