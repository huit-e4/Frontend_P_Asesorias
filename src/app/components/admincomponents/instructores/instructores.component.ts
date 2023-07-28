import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css']
})

export class InstructoresComponent implements OnInit {
  ngOnInit(): void {
    this.loadData();
    this.loadDataSolicitudes();
  }
  constructor(private userS:UserService) {

  }
  // estudiantes = [
  //   { id: 1, nombre: 'Juan', edad: 25, correo: 'juan@example.com' },
  //   { id: 2, nombre: 'María', edad: 30, correo: 'maria@example.com' },
  //   { id: 3, nombre: 'Pedro', edad: 28, correo: 'pedro@example.com' },
  //   { id: 4, nombre: 'Ana', edad: 22, correo: 'ana@example.com' },
  //   { id: 5, nombre: 'goku', edad: 25, correo: 'juan@example.com' },
  //   { id: 6, nombre: 'Maa', edad: 30, correo: 'maria@example.com' },
  //   { id: 7, nombre: 'radi', edad: 28, correo: 'pedro@example.com' },
  //   { id: 8, nombre: 'Tiapaola', edad: 22, correo: 'ana@example.com' },
  //   { id: 9, nombre: 'Transformer', edad: 22, correo: 'for@example.com' },
  //   { id: 10, nombre: 'Robot', edad: 22, correo: 'rob@example.com' },
  //   // Agrega más estudiantes si lo deseas
  // ];
  pageSize = 9; // Cantidad de estudiantes por página
  currentPage = 1; // Página actual
  sortBy = 'nombre'; // Criterio de ordenación inicial

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortExperts();
  }

  // Función para ordenar los estudiantes según el criterio seleccionado
  sortExperts() {
    this.expertsArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.name.localeCompare(b.name); // Ordenar por nombre (orden alfabético)
      } else if (this.sortBy === 'edad') {
        return a.edad - b.edad; // Ordenar por edad (de menor a mayor)
      }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }

  // Obtener los estudiantes para la página actual
  getExpertsForCurrentPage() {
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

  // GetExperts(){
  //   const users=this.userS.getExperts().subscribe((res:any)=>{
  //     // console.log(res.users);
  //     this.expertsArr=res.users;
  //     console.log(this.expertsArr);
      
      
  // })}

  loadData(){
    // Llamar a la función getExperts() del servicio
    this.userS.getExperts().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', experts);
        this.expertsArr=experts.users;
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }
  solicitudesArr:any[]=[]
  loadDataSolicitudes(){
    this.userS.getCv().subscribe(
      (solicitudes: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', solicitudes);
        this.solicitudesArr=solicitudes.asesorias;
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }
}
