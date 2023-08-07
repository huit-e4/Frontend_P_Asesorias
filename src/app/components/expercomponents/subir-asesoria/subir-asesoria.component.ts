import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-subir-asesoria',
  templateUrl: './subir-asesoria.component.html',
  styleUrls: ['./subir-asesoria.component.css']
})
export class SubirAsesoriaComponent implements OnInit {

  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) { }
  progress: number = 0;

  ngOnInit(): void {
    this.updateProgress();
  }


  updateProgress() {
    const totalFields = 3; // Cambia este valor si añades o quitas campos en el formulario
    const completedFields = Object.values(this.asesoriaForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }
  
  asesoriaForm: FormGroup = this.theForm.group({
    nombre: ["", [Validators.required, Validators.minLength(10)]],
    precio: ["", [Validators.required, Validators.min(500), Validators.max(9999)]],
    desc: ["", [Validators.required, Validators.minLength(15)]]
  })

  validInput(campo: string) {
    return this.asesoriaForm.controls[campo].errors && this.asesoriaForm.controls[campo].touched

  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro exitoso!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tu CV no ha sido aprobado. No puedes registrar asesorias!!'
    })
  }



  saveData() {
  if (this.asesoriaForm && this.asesoriaForm.valid) {
    const formData = {
      nombre: this.asesoriaForm.get('nombre')!.value,
      precio: this.asesoriaForm.get('precio')!.value,
      desc: this.asesoriaForm.get('desc')!.value
    };
    this.user.addAsesoria(formData).subscribe(
      response => {
        console.log('Asesoria guardada con éxito');
        // resetear el formulario después de guardar
        this.asesoriaForm.reset();
        this.updateProgress(); // Actualizar progreso después de guardar
        this.goodNot();
        this.rou.navigate(['/homeexpert/Asesoria']);
      },
      error => {
        console.error('Error al guardar la asesoría:', error);
        this.asesoriaForm.reset();
        this.updateProgress();
        this.badNot();

      }
    );
  }
  
}


  


}
