import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit{
  categories: Category[] = []; // Aquí almacenarás las categorías
  showForm = false; // Variable para controlar la visibilidad del formulario


  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) { }
  progress: number = 0;

  ngOnInit(): void {
    this.updateProgress();
    this.user.getAllCategorias().subscribe((data) => {
      this.categories = data.categorias; //Para que ya no sea un objeto si no un arreglo
      console.log('mi data', this.categories);

    });
  }

  updateProgress() {
    const totalFields = 1; // Cambia este valor si añades o quitas campos en el formulario
    const completedFields = Object.values(this.catForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  catForm: FormGroup = this.theForm.group({
    nombre: ["",[Validators.required, Validators.minLength(5)]],
  })


  validInput(campo: string){
    return this.catForm.controls[campo].errors && this.catForm.controls[campo].touched

  }

  toggleForm() {
    this.showForm = !this.showForm; // Mostrar u ocultar el formulario al hacer clic en el botón
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


  saveRegister() {
    // Crear un objeto FormData para agrupar los datos
    const formData = new FormData();
    
    formData.append('nombre', this.catForm.get('nombre')?.value);    

    // Enviar el formData al backend utilizando HttpClient (por ejemplo, mediante el servicio UserService)
    this.user.addCategory(formData).subscribe(
      (response) => {
        // Procesar la respuesta del backend si es necesario
        console.log('Respuesta del backend:', response);
        this.goodNot();
        this.rou.navigate(['/homeadmin/categorias']);
      },
      (error) => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar datos al backend:', error);
      }
    );
    // Restablecer el formulario después de enviar los datos
    this.catForm.reset();
    this.updateProgress(); // Actualizar progreso después de guardar
  }


}
