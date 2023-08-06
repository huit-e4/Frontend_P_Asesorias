import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

interface Curso {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
  active: boolean;
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {


  ngOnInit(): void {
    this.getCursos();
    //this.loadData();
  }

  constructor(private userS:UserService) {
  }

  //cursos: Curso[] = [
  //  { id: 1, nombre: 'Curso A', precio: 100, disponible: true },
 // { id: 2, nombre: 'Curso B', precio: 80, disponible: false },
 // { id: 3, nombre: 'Curso C', precio: 120, disponible: true },
 /// { id: 4, nombre: 'Curso D', precio: 90, disponible: true },
 /// { id: 5, nombre: 'Curso E', precio: 150, disponible: false },
 /// { id: 6, nombre: 'Curso F', precio: 70, disponible: true },
  ///{ id: 7, nombre: 'Curso G', precio: 110, disponible: false },
 // { id: 8, nombre: 'Curso H', precio: 130, disponible: true },
 // { id: 9, nombre: 'Curso I', precio: 85, disponible: true },
 // { id: 10, nombre: 'Curso J', precio: 95, disponible: false },
 /// { id: 11, nombre: 'Curso K', precio: 140, disponible: true },
 //// { id: 12, nombre: 'Curso L', precio: 75, disponible: true },
 /// { id: 13, nombre: 'Curso M', precio: 115, disponible: false },
 /// { id: 14, nombre: 'Curso N', precio: 90, disponible: true },
 // { id: 15, nombre: 'Curso O', precio: 105, disponible: false },
 // { id: 16, nombre: 'Curso P', precio: 125, disponible: true },
    // Agrega más cursos si lo deseas
 // ];

  pageSize = 4; // Cantidad de cursos por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortCourses();
  }

  // Función para ordenar los cursos según el criterio seleccionado
 // Función para ordenar los cursos según el criterio seleccionado
sortCourses() {
  this.expertsArr.sort((a, b) => {
    if (this.sortBy === 'nombre') {
      return a.nombre.localeCompare(b.nombre); // Ordenar por nombre (orden alfabético)
    } else if (this.sortBy === 'precio') {
      return a.precio - b.precio; // Ordenar por precio (de menor a mayor)
    } else if (this.sortBy === 'active') {
      return a.active === b.active ? 0 : (a.dactive ? -1 : 1); // Ordenar por disponibilidad (disponibles primero)
    }
    return 0;
  });
  this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
}


  // Obtener los cursos para la página actual
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

  expertsArr:any[]=[];



  getCursos() {
    // Llamar a la función getExperts() del servicio
    this.userS.getAsesorias().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de curso:', experts);
        this.expertsArr = experts.asesorias.map((curso: any) => ({
          id: curso.id,
          nombre: curso.nombre,
          desc: curso.desc,
          precio: curso.precio,
          active: curso.active // Asegúrate de que coincida con el nombre del atributo en los datos
        }));
        console.log('Datos de curso:', experts);
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
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
