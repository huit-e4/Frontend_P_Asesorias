import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Category } from 'src/app/interfaces/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit{
  private categoriaDeletedSubscription: Subscription;
  private categoriaAddedSubscription: Subscription;

  p: number = 1; // Inicializa la variable p para la paginación

  categories: Category[] = []; // Aquí almacenarás las categorías
  showForm = false; // Variable para controlar la visibilidad del formulario
  searchTerm: string = ''; // Variable para el término de búsqueda


  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) {
    // Inicializar la suscripción en el constructor
    this.categoriaDeletedSubscription = this.user.getCategoriaDeletedObservable().subscribe(() => {
      this.loadCategorias();
    });
    this.categoriaAddedSubscription = this.user.getCategoriesObservable().subscribe(() => {
      this.loadCategorias();
    });
   }
  progress: number = 0;

  ngOnInit(): void {
    this.updateProgress();
    // this.user.getAllCategorias().subscribe((data) => {
    //   this.categories = data.categorias; //Para que ya no sea un objeto si no un arreglo
    //   console.log('mi data', this.categories);
    // });
    this.loadCategorias();
  }

  loadCategorias() {
    this.user.getAllCategorias().subscribe((data) => {
      this.categories = data.categorias;
      console.log('mi data', this.categories);
      this.getFilteredCategories();
    });
  }

  ngOnDestroy(): void {
    // Importante desuscribirse al destruir el componente
    this.categoriaDeletedSubscription.unsubscribe();
    this.categoriaAddedSubscription.unsubscribe();
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

   // Función para filtrar categorías en base al término de búsqueda
   filterCategories() {
    return this.categories.filter(cat =>
      cat.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

//Filtrar las categorias
  getFilteredCategories() {
    const filteredCategories = this.filterCategories();
    return filteredCategories.slice((this.p - 1),this.p * 10);
  }

  // getFilteredCategories() {
  //   const filteredCategories = this.filterCategories();
  //   return filteredCategories.slice((this.p - 1) * 3, this.p * 3);
  // }
  
  

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
        // this.rou.navigate(['/homeadmin/categorias']);
        // this.loadCategorias();
        
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


  //Borrar categoria por id
  borrarCategoria(id: number) {
    this.user.eliminarCategoria(id).subscribe(
      () => {
        console.log('Asesoría eliminada con éxito');
        this.goodNot();
      },
      (error) => {
        console.error('Error al eliminar la categoria:', error);
      }
    );
  }



  confirmarAlert(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarCategoria(id); // Pasa el id como argumento a la función borrarAsesoria()
      }
    });
  }

  goodNotif() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Categoria borrada exitosamente!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }


}
