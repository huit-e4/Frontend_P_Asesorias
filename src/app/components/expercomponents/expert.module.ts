import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { HomeExpertoComponent } from './home-experto/home-experto.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { PerfilExpertComponent } from './perfil-expert/perfil-expert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ExpertgGuard } from 'src/app/guards/expertg.guard';
import { HomeExpertComponent } from '../home-expert/home-expert.component';
import { SubircvComponent } from './subircv/subircv.component';

const routes: Routes = [
  {
    path: 'homeexpert',
    component: HomeExpertComponent, children: [
      {
        path: '', 
        component: HomeExpertoComponent,
        canActivate: [ExpertgGuard] 
      },
      {
        path: 'subirCv',
        component: CargarCvComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'perfil',
        component: PerfilExpertComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'uploadcv',
        component: SubircvComponent,
        canActivate: [ExpertgGuard]
      },

      {
        path: 'alumnos',
        component: AsesoriasComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'Asesoria',
        component: AsesoriasComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'inscritos',
        component: InscripcionesComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
    canActivate: [ExpertgGuard]


  },

]


@NgModule({
  declarations: [
    AsesoriasComponent,
    CargarCvComponent,
    HomeExpertoComponent,
    InscripcionesComponent,
    PerfilExpertComponent,
    SubircvComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    AsesoriasComponent,
    CargarCvComponent,
    HomeExpertoComponent,
    InscripcionesComponent,
    PerfilExpertComponent
  ]
})
export class ExpertModule { }
