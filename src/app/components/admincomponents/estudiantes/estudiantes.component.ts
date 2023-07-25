import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
  correo: string;
}

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent {
  ngOnInit(): void {
    this.getEstudiantes();
  }
  constructor(private userS:UserService) {

  }

  //estudiantes = [
  //  { id: 1, nombre: 'Juan', edad: 25, correo: 'juan@example.com' },
  //  { id: 2, nombre: 'María', edad: 30, correo: 'maria@example.com' },
  //  { id: 3, nombre: 'Pedro', edad: 28, correo: 'pedro@example.com' },
  //  { id: 4, nombre: 'Ana', edad: 22, correo: 'ana@example.com' },
  //  { id: 5, nombre: 'goku', edad: 25, correo: 'juan@example.com' },
  //  { id: 6, nombre: 'Maa', edad: 30, correo: 'maria@example.com' },
  //  { id: 7, nombre: 'radi', edad: 28, correo: 'pedro@example.com' },
  //  { id: 8, nombre: 'Tiapaola', edad: 22, correo: 'ana@example.com' },
    // Agrega más estudiantes si lo deseas
  //];
  pageSize = 4; // Cantidad de estudiantes por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortStudents();
  }

  // Función para ordenar los estudiantes según el criterio seleccionado
  sortStudents() {
    this.expertsArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.nombre.localeCompare(b.nombre); // Ordenar por nombre (orden alfabético)
      } else if (this.sortBy === 'edad') {
        return a.edad - b.edad; // Ordenar por edad (de menor a mayor)
      }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }

  // Obtener los estudiantes para la página actual
  getStudentsForCurrentPage(): Estudiante[] {
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
    return Math.ceil(this.getEstudiantes.length / this.pageSize);
  }

  // Obtener un array con los números de página
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  expertsArr:any[]=[];

  getEstudiantes(){
    const users=this.userS.getEstudiantes().subscribe((res:any)=>{
      // console.log(res.users);
      this.expertsArr=res.users;
      console.log(this.expertsArr);
      
      
  })}

}
