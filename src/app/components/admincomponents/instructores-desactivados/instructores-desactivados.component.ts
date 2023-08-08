import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructores-desactivados',
  templateUrl: './instructores-desactivados.component.html',
  styleUrls: ['./instructores-desactivados.component.css']
})
export class InstructoresDesactivadosComponent {

  
  ngOnInit(): void {
    

  }

  
  constructor(private userS:UserService) {
  }
  pageSize = 4; // Cantidad de Instructores por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortStudents();
  }

  // Función para ordenar los Instructores según el criterio seleccionado
  sortStudents() {
    this.expertsArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.name.localeCompare(b.name); // Ordenar por nombre (orden alfabético)
      } else if (this.sortBy === 'edad') {
        return a.edad - b.edad; // Ordenar por edad (de menor a mayor)
      } else if (this.sortBy === 'genero') {
        return a.sexo.localeCompare(b.genero); // Ordenar por género (orden alfabético)
      }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }
 
  // Obtener los Instructores para la página actual
  getStudentsForCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.expertsArr.slice(startIndex, endIndex);
  }

  // Cambiar la página actual
  setPage(page: number) {
    this.currentPage = page;
  }

  // Obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.getInstructores.length / this.pageSize);
  }

  // Obtener un array con los números de página
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  expertsArr:any[]=[];

  getInstructores(){
    const users=this.userS.getEstudiantes().subscribe((res:any)=>{
      // console.log(res.users);
      this.expertsArr=res.users;
      console.log(this.expertsArr);
      
      
  })}

  modificarEstudiante(estudiante:any) {
    alert(`Modificar estudiante: ${estudiante.name}`);
    
  }

  // Función para eliminar estudiante (simplemente muestra un mensaje por ahora)
  eliminarEstudiante(estudiante:any) {
    this.userS.eliminarestudiante(estudiante.id).subscribe(
      (response: any) => {
        // Si la API devuelve éxito, elimina el estudiante de la lista local
        const index = this.expertsArr.findIndex((e) => e.id === estudiante.id);
        if (index !== -1) {
          this.expertsArr.splice(index, 1);
        }
        alert(`Estudiante "${estudiante.name}" desactivado correctamente.`);
      },
      (error) => {
        console.error('Error al eliminar el estudiante:', error);
        alert(`Error al eliminar el estudiante "${estudiante.name}".`);
      }
    );
  }

  
  loadData(){
    // Llamar a la función getExperts() del servicio
    this.userS.getEstudiantes().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', experts);
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }

  eliminar(id:number, ){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Deseas desactivar estudiante?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      
      if (result.isConfirmed ) {
        this.expertsArr.splice( -1);
        this.userS.eliminarestudiante(id).subscribe(
          (res: any, ) => {
            // Mostrar los datos en la consola
            console.log('Datos de estudiante:', res);
            swalWithBootstrapButtons.fire(
              '¡Aceptado!',
              'Solicitud ha sido aceptada',
              'success'
            )
          },
          (error) => {
            console.error('Error al desactivar:', error);
          }
        );
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      
      }
    })
  }
}
