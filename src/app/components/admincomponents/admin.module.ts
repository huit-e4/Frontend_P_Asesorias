import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdministradoresComponent } from './administradores/administradores.component';
import { CursosComponent } from './cursos/cursos.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { HomeadminComponent } from './homeadmin/homeadmin.component';
import { InstructoresComponent } from './instructores/instructores.component';
import { PerfilAComponent } from './perfil-a/perfil-a.component';
import { TablaInstructoresComponent } from './tabla-instructores/tabla-instructores.component';
import { TablaSolicitudesIComponent } from './tabla-solicitudes-i/tabla-solicitudes-i.component';
import { AdmingGuard } from 'src/app/guards/adming.guard';
import { HomeAdminComponent } from '../home-admin/home-admin.component';

const routes: Routes = [
  {
    path: 'homeadmin',
    component: HomeAdminComponent, children: [
      {
        path: '', 
        component: HomeadminComponent,
       canActivate: [AdmingGuard] // child route component that the router renders
      },
      {
        path: 'instructors', 
        component: InstructoresComponent, children:[
          { path: '', 
           component: TablaInstructoresComponent,
           canActivate: [AdmingGuard]
          },
           {
           path: 'aprsolicitudes', 
          component: TablaSolicitudesIComponent,
         canActivate: [AdmingGuard]
       }
         ],
       canActivate: [AdmingGuard] 
      },
      {
        path: 'estudiantes', 
        component: EstudiantesComponent,
       canActivate: [AdmingGuard] 
      },
      {
        path: 'cursos', 
        component: CursosComponent,
       canActivate: [AdmingGuard] 
      },
      {
        path: 'perfil', 
        component: PerfilAComponent,
        canActivate: [AdmingGuard] 
      },
      {
        path: 'administrators', 
        component: AdministradoresComponent,
       canActivate: [AdmingGuard] 
      },
      {
        path:'**',
        redirectTo:''
      }
    ],
   // canActivate: [AdmingGuard]

  },


]

@NgModule({
  declarations: [
    AdministradoresComponent,
    CursosComponent,
    EstudiantesComponent,
    HomeadminComponent,
    InstructoresComponent,
    PerfilAComponent,
    TablaInstructoresComponent,
    TablaSolicitudesIComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    AdministradoresComponent,
    CursosComponent,
    EstudiantesComponent,
    HomeadminComponent,
    InstructoresComponent,
    PerfilAComponent,
    TablaInstructoresComponent,
    TablaSolicitudesIComponent
  ]
})
export class AdminModule { }
