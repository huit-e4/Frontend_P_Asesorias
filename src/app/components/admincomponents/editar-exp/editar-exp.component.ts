import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editar-exp',
  templateUrl: './editar-exp.component.html',
  styleUrls: ['./editar-exp.component.css']
})
export class EditarExpComponent implements OnInit{

  constructor(private rou: ActivatedRoute, private theForm: FormBuilder, private usr: UserService, private router: Router) { }
  id_user: any; //Guardo id
  user_data: any = {}; // Inicializa como objeto vacío


  ngOnInit(): void {
    const id = parseInt(this.rou.snapshot.paramMap.get('id') || '');
    this.id_user = id;
    console.log('Este es mi', this.id_user);
    this.getUserId(id);
  }

  userForm: FormGroup = this.theForm.group({
    name: ["", [Validators.required, Validators.minLength(5)]],
    lastname: ["", [Validators.required, Validators.min(5), Validators.max(50)]],
    mat: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    edad: ["", [Validators.required, Validators.min(18), Validators.max(30)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.minLength(10)]
  })

  validInput(campo: string) {
    return this.userForm.controls[campo].errors && this.userForm.controls[campo].touched

  }


  getUserId(id: number) {
    this.usr.getUserOnlyId(id).subscribe(
      (user: any) => {
        this.user_data = user; // Almacena el objeto completo recibido
        this.extractUserData();
        this.userForm.patchValue(this.user_data);
        console.log('Mis datos', this.user_data);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  extractUserData() {
    if (this.user_data && this.user_data.user) {
      // Extrae los datos del usuario y sobrescribe user_data
      this.user_data = this.user_data.user;
    }
  }

  saveData() {
    if (this.userForm && this.userForm.valid) {
      this.usr.updateUserById(this.id_user, this.userForm.value).subscribe(
        () => {
          console.log('Datos actualizados correctamente');
          this.goodNot();
          this.router.navigate(['homeadmin/Activo']);

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
