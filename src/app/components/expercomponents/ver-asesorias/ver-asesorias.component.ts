import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

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
export class VerAsesoriasComponent implements OnInit{
  private asesoriaDeletedSubscription: Subscription;

  ngOnInit(): void {
    this.getCursos();
  }

  ngOnDestroy(): void {
    // Importante desuscribirse al destruir el componente
    this.asesoriaDeletedSubscription.unsubscribe();
  }

  

  constructor(private userS: UserService, private router: Router) {
    // Inicializar la suscripción en el constructor
    this.asesoriaDeletedSubscription = this.userS.getAsesoriaDeletedObservable().subscribe(() => {
      this.getCursos();
    });
   }

  pageSize = 4; // Cantidad de cursos por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial
  registros: Registro[] = [];
  students: { asesoria: any, registros: any[] } = { asesoria: null, registros: [] };

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

      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }


  // ...



  datosSolicitud: any = null;

  verSolicitud(datos: any) {
    this.datosSolicitud = datos
    console.log(this.datosSolicitud);

  }


  verAlumnosRegistrados(id: number) {
    // Llamar a la función getAsesorias() del servicio para obtener la lista de cursos
    this.userS.getAlumnoInscrito(id).subscribe(
      (alumnos: any) => {
        // Mostrar los datos en la consola
        this.students = alumnos
        console.log('Alumnos de alta en el curso:', this.students);
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }

  //Borrar asesoria por id
  borrarAsesoria(id: number) {
    // Llamar a la función deleteAsesoriaById() del servicio para eliminar la asesoría por su ID
    this.userS.deleteAsesoriaById(id).subscribe(
      () => {
        console.log('Asesoría eliminada con éxito');
      },
      (error) => {
        console.error('Error al eliminar la asesoría:', error);
        this.badNot();
      }
    );
  }


  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salió mal...!'
    })
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
        this.borrarAsesoria(id); // Pasa el id como argumento a la función borrarAsesoria()
        Swal.fire('Asesoria borrada!!!');
      }
    });
  }






}
