import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

interface Curso {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
  active: boolean;
}

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})
export class AsesoriasComponent {
  pageSize = 9; // Cantidad de cursos por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial

  expertsArr: Curso[] = [];

  constructor(private userS: UserService) {
    // Llamar a la función loadData() para cargar los datos de los expertos
    this.loadData();
  }

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortExperts();
  }

  // Función para ordenar los cursos según el criterio seleccionado
  sortExperts() {
    this.expertsArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.nombre.localeCompare(b.nombre); // Ordenar por nombre (orden alfabético)
      } else if (this.sortBy === 'precio') {
        return a.precio - b.precio; // Ordenar por precio (de menor a mayor)
      } else if (this.sortBy === 'disponible') {
        return a.active === b.active ? 0 : a.active ? -1 : 1; // Ordenar por disponibilidad (activo primero)
      }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }

  // Obtener los cursos para la página actual
  getCoursesForCurrentPage() {
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

  // Cargar los datos de los expertos
  loadData() {
    this.userS.getExperts().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', experts);
        this.expertsArr = experts.users;
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }
}