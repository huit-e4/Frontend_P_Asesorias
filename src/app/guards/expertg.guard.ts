import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ExpertgGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuth()) {
      console.log('Estamos dentro del sistema');
      const storedValue = localStorage.getItem('user');
      if (storedValue) {
        const user = JSON.parse(storedValue);
        if (user && user.rol_id === 2 && user.active === 1) {
          return true; // Permiso concedido, usuario con rol_id 2
        } else {
          console.log('No tienes permisos suficientes');
          localStorage.removeItem('token'); // Elimina el valor de la clave 'token' del LocalStorage
          localStorage.removeItem('user');
          console.log('LocalStorage borrado');
          this.errorAlert();
          this.router.navigateByUrl('/login'); // Redirigir a la ruta deseada para el rol_id 2
          return false; // Permiso denegado
        }
      } else {
        console.log('No se encontraron datos de usuario en el Local Storage');
        this.router.navigateByUrl('/login');
        return false; // Permiso denegado
      }
    } else {
      console.log('No estoy logueado');
      this.errorAlert();
      this.router.navigateByUrl('/login');
      return false; // Permiso denegado
    }
  }




  errorAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Acceso denegado!'
    })
  }
  
}
