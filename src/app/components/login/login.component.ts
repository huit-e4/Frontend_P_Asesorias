import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private theForm: FormBuilder, private user: UserService, private sharedD: SharedDataService, private rou: Router) { }



  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login exitoso!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Datos incorrectos, ponte en contacto con el admin!'
    })
  }

  ErrorNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Rol no identificado!'
    })
  }




  loginForm: FormGroup = this.theForm.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  })


  ngOnInit(): void {
  }




  saveLogin() {
    this.user.loginIn(this.loginForm.value).subscribe(
      (datos: any) => {
        if (datos && datos.Usuario && datos.Usuario.active === 1) {
          // this.openSnackBar('Login successfully!!!', 'Close');
          this.user.saveToken(datos.Token);
          this.user.saveUser(datos.Usuario);
          // En la función saveLogin(), después de autenticar al usuario y obtener los datos
          // del usuario, actualiza los datos en el servicio SharedDataService
          this.sharedD.updateUserData(datos.Usuario);
          console.log(datos);
          this.loginForm.reset();

          // Redireccionar según el valor de rol_id
          switch (datos.Usuario.rol_id) {
            case 1:
              this.rou.navigate(['/homeadmin']);
              this.goodNot();
              break;
            case 2:
              this.rou.navigate(['/homeexpert']);
              this.goodNot();
              break;
            case 3:
              this.rou.navigate(['/homestudent']);
              this.goodNot(); //Login exitoso

              break;
            default:
              // Si no coincide con ninguno de los valores anteriores, redirigir a una página predeterminada
              this.rou.navigate(['/default']);
              this.ErrorNot(); //Rol no identificado
              localStorage.removeItem('token'); // Elimina el valor de la clave 'token' del LocalStorage
              localStorage.removeItem('user');
              break;
          }
        } else {
          this.badNot(); //Error al intentar iniciar sesion
          this.loginForm.reset();
        }
      },
      error => {
        this.badNot();
        this.loginForm.reset();
      }
    );
  }

  validInput(campo: string) {
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched

  }



}
