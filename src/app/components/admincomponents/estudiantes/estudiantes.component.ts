import { Component } from '@angular/core';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent {
  personas = [
    { id: 1, nombre: 'Juan', edad: 25, correo: 'juan@example.com' },
    { id: 2, nombre: 'María', edad: 30, correo: 'maria@example.com' },
    { id: 3, nombre: 'Pedro', edad: 28, correo: 'pedro@example.com' },
    { id: 4, nombre: 'Ana', edad: 22, correo: 'ana@example.com' },
    { id: 5, nombre: 'goku', edad: 25, correo: 'juan@example.com' },
    { id: 6, nombre: 'Maa', edad: 30, correo: 'maria@example.com' },
    { id: 7, nombre: 'radi', edad: 28, correo: 'pedro@example.com' },
    { id: 8, nombre: 'Tiapaola', edad: 22, correo: 'ana@example.com' },
    // Agrega más personas si lo deseas
  ];

  page = 1;
  pageSize = 4; // Cantidad de elementos por página

  // Función para cambiar la página
  setPage(page: number) {
    this.page = page;
  }

  getPeopleForPage(): any[] {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.personas.slice(startIndex, endIndex);
  }

  // Obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.personas.length / this.pageSize);
  }

  // Función para obtener un array con los números de página
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

}
