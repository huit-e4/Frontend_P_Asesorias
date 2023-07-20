import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { PrincipalService } from '../services/principal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //usuario: LoginUsuarioDto = new LoginUsuarioDto('', '');

 

  constructor(
    private PrincipalService: PrincipalService
  ) { }

  Email: string = '';
Password: string = '';
emailTouched: boolean = false;
passwordTouched: boolean = false;

onLogin() {
  if (this.validateEmail() && this.validatePassword()) {
    // Realizar la lógica de inicio de sesión aquí
    // this.PrincipalService.login(this.Email, this.Password);
  }
}

validateEmail(): boolean {
  // Validar el correo electrónico utilizando una expresión regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!this.Email || !emailRegex.test(this.Email)) {
    // Mostrar un mensaje de error o realizar alguna acción en caso de validación fallida
    return false;
  }
  return true;
}

validatePassword(): boolean {
  // Validar la contraseña basada en una longitud mínima
  if (!this.Password || this.Password.length < 6) {
    // Mostrar un mensaje de error o realizar alguna acción en caso de validación fallida
    return false;
  }
  return true;
}

}
