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
import { TablaSolicitudesRComponent } from './tabla-solicitudes-r/tabla-solicitudes-r.component';
import { TablaSolicitudesAComponent } from './tabla-solicitudes-a/tabla-solicitudes-a.component';
import { RegistrarusuarioComponent } from './registrarusuario/registrarusuario.component';

import { EditarEstComponent } from './editar-est/editar-est.component';
import { EditarAdComponent } from './editar-ad/editar-ad.component';
import { EditarExpComponent } from './editar-exp/editar-exp.component';

import { TablaDeExpertComponent } from './tabla-de-expert/tabla-de-expert.component';
import { DesactivadosComponent } from './desactivados/desactivados.component';
import { AdminDesactivadosComponent } from './admin-desactivados/admin-desactivados.component';
import { StudentsDesactivadosComponent } from './students-desactivados/students-desactivados.component';
import { InstructoresDesactivadosComponent } from './instructores-desactivados/instructores-desactivados.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { NgxPaginationModule } from 'ngx-pagination';


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
        component: InstructoresComponent, children: [
          {
            path: '',
            component: TablaSolicitudesAComponent,
            canActivate: [AdmingGuard]
          },
          {
            path: 'aprsolicitudes',
            component: TablaSolicitudesIComponent,
            canActivate: [AdmingGuard]
          },
          {
            path: 'solicitudesrec',
            component: TablaSolicitudesRComponent,
            canActivate: [AdmingGuard]
          },
          {
            path: 'solicitudesapr',
            component: TablaSolicitudesAComponent,
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
        path: 'registrarusuario',
        component: RegistrarusuarioComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'editaradmin/:id',
        component: EditarAdComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'editarstudent/:id',
        component: EditarEstComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'editarexperto/:id',
        component: EditarExpComponent,
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
      // {
      //   path: '**',
      //   redirectTo: '',
      //   path: 'Activo',
      //   component: TablaDeExpertComponent,
      //   canActivate: [AdmingGuard]
      // },
      {
        path: 'Activo',
        component: TablaDeExpertComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'categorias',
        component: AddcategoryComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'desactivados',
        component: DesactivadosComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'admDesactivados',
        component: AdminDesactivadosComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'estDesactivados',
        component: StudentsDesactivadosComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: 'insDesactivados',
        component: InstructoresDesactivadosComponent,
        canActivate: [AdmingGuard]
      },
      {
        path: '**',
        redirectTo: ''
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
    TablaSolicitudesIComponent,
    TablaSolicitudesRComponent,
    TablaSolicitudesAComponent,
    RegistrarusuarioComponent,
    EditarEstComponent,
    EditarAdComponent,
    EditarExpComponent,
    TablaDeExpertComponent,
    DesactivadosComponent,
    AdminDesactivadosComponent,
    StudentsDesactivadosComponent,
    InstructoresDesactivadosComponent,
    AddcategoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AdministradoresComponent,
    CursosComponent,
    EstudiantesComponent,
    HomeadminComponent,
    InstructoresComponent,
    PerfilAComponent,
    TablaInstructoresComponent,
    TablaSolicitudesIComponent,
    TablaSolicitudesRComponent,
    RegistrarusuarioComponent,
    DesactivadosComponent,
    AdminDesactivadosComponent,
    StudentsDesactivadosComponent,
    InstructoresDesactivadosComponent,

  ]
})
export class AdminModule { }
