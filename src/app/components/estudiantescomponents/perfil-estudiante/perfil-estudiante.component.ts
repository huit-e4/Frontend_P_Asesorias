import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent {
  constructor(private userS: UserService, private sharedD: SharedDataService, private theForm: FormBuilder, private rou: Router) {
  }


  ngOnInit(): void {
    this.getUser();
  }

  perfilForm: FormGroup = this.theForm.group({
    name: ["", [Validators.required, Validators.minLength(5)]],
    lastname: ["", [Validators.required, Validators.min(5), Validators.max(50)]],
    mat: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.minLength(10)]
  })

  validInput(campo: string) {
    return this.perfilForm.controls[campo].errors && this.perfilForm.controls[campo].touched

  }


  userD: any;;
  getUser() {
    const userL = JSON.parse(localStorage.getItem('user') || '{}');
    this.userD = userL;
    console.log(this.userD);

    // Asigna los valores del perfil al formulario
    this.perfilForm.patchValue({
      name: this.userD.name,
      lastname: this.userD.lastname,
      mat: this.userD.mat,
      email: this.userD.email,
      // La contraseña generalmente no se muestra por defecto, así que no la asignamos aquí
    });
  }

  saveData() {
    if (this.perfilForm && this.perfilForm.valid) {
      const formData = {
        name: this.perfilForm.get('name')!.value,
        lastname: this.perfilForm.get('lastname')!.value,
        mat: this.perfilForm.get('mat')!.value,
        email: this.perfilForm.get('email')!.value
      };
      this.userS.actualizarPerfil(formData).subscribe(
        () => {
          console.log('Datos actualizados correctamente');
          // Actualizar datos en el localStorage
          const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = { ...userFromStorage, ...formData };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          // Actualizar datos en el servicio compartido para que el componente HomeExpert también los reciba
          this.sharedD.updateUserData(updatedUser);
          // resetear el formulario después de guardar
          this.perfilForm.reset();
          this.getUser();
          this.goodNot();
        },
        error => {
          console.error('Este fue el error:', error);

        }
      );
    }

  }



  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Actualización exitosa!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
