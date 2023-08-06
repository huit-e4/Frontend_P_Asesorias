import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface Curso {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
  active: boolean;
}
interface Registro {
  id: number;
  nombre: string;
  desc: string;
  precio: string;
  active: number;
  user: {
    id: number;
    name: string;
    mat: string;
    lastname: string;
    edad: number;
    sexo: string;
    // ... other user properties
  };
}

@Component({
  selector: 'app-ver-asesorias',
  templateUrl: './ver-asesorias.component.html',
  styleUrls: ['./ver-asesorias.component.css']
})
export class VerAsesoriasComponent {
  ngOnInit(): void {
    this.getCursos();
    
    //this.loadData();
  }

  constructor(private userS: UserService, private router: Router) {}

  pageSize = 4; // Cantidad de cursos por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial
  registros: Registro[] = [];
  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortCourses();
  }

  // Función para ordenar los cursos según el criterio seleccionado
  sortCourses() {
    this.expertsArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.nombre.localeCompare(b.nombre); // Ordenar por nombre (orden alfabético)
      } else if (this.sortBy === 'precio') {
        return a.precio - b.precio; // Ordenar por precio (de menor a mayor)
      } else if (this.sortBy === 'disponible') {
        return a.active === b.active ? 0 : (a.active ? -1 : 1); // Ordenar por disponibilidad (disponibles primero)
      }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }

  // Obtener los cursos para la página actual
  getCoursesForCurrentPage(): Curso[] {
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
    return Math.ceil(this.expertsArr.length / this.pageSize);
  }

  // Obtener un array con los números de página
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  expertsArr: Curso[] = [];

  getCursos() {
    // Llamar a la función getAsesorias() del servicio para obtener la lista de cursos
    this.userS.getVerAsesorias().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        this.expertsArr = experts.asesorias;
        console.log('Datos de curso:', experts);
        
        const regis = experts.registros
        
        console.log(regis);
        
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }


// ...



datosSolicitud:any=null;

verSolicitud(datos:any){
  this.datosSolicitud=datos
  console.log(this.datosSolicitud);
  
}

getVerinscritos(id:number){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-1',
      cancelButton: 'btn btn-danger mx-1'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
  }).then((result) => {
    if (result.value) {
      this.userS.getVerinscritos(id).subscribe(
        (res:any) => {
          // Mostrar los datos en la consola
          console.log('Datos de estudiante:', res);
          swalWithBootstrapButtons.fire()
            
        
        },
        (error) => {
          console.error('Error al cargar estudiante:', error);
        }
      );
    
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
    
    }
  })
}

modificarCurso(curso: Curso) {
  alert(`Modificar estudiante: ${curso.nombre}`);
  
}

// Función para eliminar estudiante (simplemente muestra un mensaje por ahora)
eliminarCurso(curso: Curso) {
  this.userS.eliminarcurso(curso.id).subscribe(
    (response: any) => {
      // Si la API devuelve éxito, elimina el estudiante de la lista local
      const index = this.expertsArr.findIndex((e) => e.id === curso.id);
      if (index !== -1) {
        this.expertsArr.splice(index, 1);
      }
      alert(`Curso "${curso.nombre}" eliminado correctamente.`);
    },
    (error) => {
      console.error('Error al eliminar el curso:', error);
      alert(`Error al eliminar el curso "${curso.nombre}".`);
    }
  );
}



  


}
