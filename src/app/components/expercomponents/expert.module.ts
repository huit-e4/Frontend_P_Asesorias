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
import { VerAsesoriasComponent } from './ver-asesorias/ver-asesorias.component';
import { SubirAsesoriaComponent } from './subir-asesoria/subir-asesoria.component';
import { ExpertosComponent } from './expertos/expertos.component';
import { InfocvComponent } from './infocv/infocv.component';
const routes: Routes = [
  {
    path: 'homeexpert',
    component: HomeExpertComponent, children: [
      // {
      //   path: '', 
      //   component: HomeExpertComponent,
      //   canActivate: [ExpertgGuard] 
      // },
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
        path: 'SubirAsesosria',
        component: SubirAsesoriaComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'infocv',
        component: InfocvComponent,
        canActivate: [ExpertgGuard]
      },

      {
        path: 'alumnos',
        component: AsesoriasComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'Asesoria',
        component: VerAsesoriasComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'inscritos',
        component: InscripcionesComponent,
        canActivate: [ExpertgGuard]
      },
      {
        path: 'verAsesorias',
        component: VerAsesoriasComponent,
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
    VerAsesoriasComponent,
    SubirAsesoriaComponent,
    ExpertosComponent,
    InfocvComponent
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
