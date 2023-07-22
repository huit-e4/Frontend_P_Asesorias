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
import { NgxPaginationModule } from 'ngx-pagination'; // Importa la biblioteca de paginación


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
    component: HomeAdminComponent,
    canActivate: [AdmingGuard]

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
  imports: [RouterModule.forRoot(routes),  NgxPaginationModule],
  exports: [RouterModule]
})


export class AppRoutingModule { }
