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
  categories: any[] = []; // Aquí almacenarás las categorías

  selectedFile: File | null = null;

  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) { }
  progress: number = 0;

  ngOnInit(): void {
    this.updateProgress();
    this.user.getAllCategorias().subscribe((data) => {
      this.categories = data.categorias;
      console.log('mi data', this.categories);

    });
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
      this.asesoriaForm.get('rutaCv')?.markAsTouched();
    }
  }

  updateProgress() {
    const totalFields = 5; // Cambia este valor si añades o quitas campos en el formulario
    const completedFields = Object.values(this.asesoriaForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  asesoriaForm: FormGroup = this.theForm.group({
    nombre: ["", [Validators.required, Validators.minLength(10)]],
    precio: ["", [Validators.required, Validators.min(500), Validators.max(9999)]],
    desc: ["", [Validators.required, Validators.minLength(15)]],
    categoria_id: ["", Validators.required],
    imgcurso: ["", Validators.required],
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
    // Crear un objeto FormData para agrupar los datos
    const formData = new FormData();

    //Agrega los datos del form
    formData.append('nombre', this.asesoriaForm.get('nombre')?.value);
    formData.append('desc', this.asesoriaForm.get('desc')?.value);
    formData.append('precio', this.asesoriaForm.get('precio')?.value);
    formData.append('categoria_id', this.asesoriaForm.get('categoria_id')?.value);

    // Agregar el archivo IMGal FormData, si hay un archivo seleccionado
    if (this.selectedFile) {
      formData.append('imgcurso', this.selectedFile, this.selectedFile.name);
    }

    // Enviar el formData al backend utilizando HttpClient (por ejemplo, mediante el servicio UserService)
    this.user.addAsesoria(formData).subscribe(
      (response) => {
        // Procesar la respuesta del backend si es necesario
        console.log('Respuesta del backend:', response);
        this.goodNot();
        this.rou.navigate(['/homeexpert/Asesoria']);
      },
      (error) => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar datos al backend:', error);
        this.badNot();
        this.rou.navigate(['/homeexpert']);
      }
    );

    // Restablecer el formulario después de enviar los datos
    this.asesoriaForm.reset();
    this.updateProgress(); // Actualizar progreso después de guardar
    this.selectedFile = null; // Reiniciar la variable del archivo seleccionado
  }


}
