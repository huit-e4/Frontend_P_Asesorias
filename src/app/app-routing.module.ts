import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },

  {
    path: 'ha',
    loadChildren: () => import('./components/admincomponents/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'he',
    loadChildren: () => import('./components/expercomponents/expert.module').then(m => m.ExpertModule)
  },
  {
    path: 'hestudiante',
    loadChildren: () => import('./components/estudiantescomponents/estudiante.module').then(m => m.EstudianteModule)
  }

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})


export class AppRoutingModule { }
