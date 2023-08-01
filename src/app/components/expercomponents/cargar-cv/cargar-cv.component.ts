import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.css']
})
export class CargarCvComponent implements OnInit{
  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) { }

  ngOnInit(): void {
  }

  selectedFile: File | null = null;


  cvForm: FormGroup = this.theForm.group({
    razon: ["",[Validators.required, Validators.minLength(20)]],
    rutaCv: ["",Validators.required]
  })


  validInput(campo: string){
    return this.cvForm.controls[campo].errors && this.cvForm.controls[campo].touched

  }

  
  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    // Check if a file is selected
    if (file) {
      // You can add more validations here, like checking the file type or size if needed
      // Save the selected file in a variable (for example, 'selectedFile')
      this.selectedFile = file;
    } else {
      // If no file is selected, mark the control as touched to trigger validation
      this.cvForm.get('rutaCv')?.markAsTouched();
    }
  }
  

  goodNot(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registro exitoso!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Solo una vez puedes subir tu CV!'
    })
  }

  saveRegister() {
    // Crear un objeto FormData para agrupar los datos
    const formData = new FormData();
    
    // Agregar el dato de tipo string (razón) al FormData
    formData.append('razon', this.cvForm.get('razon')?.value);

    // Agregar el archivo PDF al FormData, si hay un archivo seleccionado
    if (this.selectedFile) {
      formData.append('rutaCv', this.selectedFile, this.selectedFile.name);
    }

    // Enviar el formData al backend utilizando HttpClient (por ejemplo, mediante el servicio UserService)
    this.user.registrarCv(formData).subscribe(
      (response) => {
        // Procesar la respuesta del backend si es necesario
        console.log('Respuesta del backend:', response);
        this.goodNot();
      },
      (error) => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar datos al backend:', error);
        this.badNot();
      }
    );

    // Restablecer el formulario después de enviar los datos
    this.cvForm.reset();
    this.selectedFile = null; // Reiniciar la variable del archivo seleccionado
  }

}
