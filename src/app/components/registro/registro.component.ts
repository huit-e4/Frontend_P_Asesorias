import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
import { CustomValidators } from '../../validations/custom-validator';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  
  ngOnInit(): void {
    this.updateProgress();
  }

  updateProgress() {
    const totalFields = 9; // Cambia este valor si añades o quitas campos en el formulario
    const completedFields = Object.values(this.registerForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  respuestaSeleccionada: string | undefined;
  progress: number = 0;

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userS: UserService,
    private rou: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      rol_id: ['', [Validators.required, Validators.min(1), Validators.max(3)]],
      sexo: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(18), Validators.max(50)]],
      mat: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), ]],
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      cpassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      termsAndConditions: [false, Validators.requiredTrue]
    },
    { validators: CustomValidators.passwordsMatching }
    );

}


registerData() {
  if (this.registerForm && this.registerForm.valid) {
    const formData = {
      email: this.registerForm.get('email')!.value,
      name: this.registerForm.get('name')!.value,
      mat: this.registerForm.get('mat')!.value,
      lastname: this.registerForm.get('lastname')!.value,
      rol_id: this.registerForm.get('rol_id')!.value,
      edad: this.registerForm.get('edad')!.value,
      sexo: this.registerForm.get('sexo')!.value,
      password: this.registerForm.get('password')!.value,
    };      
    this.userS.addUser(formData).subscribe(response => {
      console.log('User guardado con éxito');
    });
    // resetear el formulario después de guardar
    this.registerForm.reset();
    this.updateProgress(); // Actualizar progreso después de guardar
    this.rou.navigate(['/login']);
    this.goodAlert();
  }
}



goodAlert(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Registro existoso!!!',
    showConfirmButton: false,
    timer: 1500
  })
}
}
