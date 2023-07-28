import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-instructures',
  templateUrl: './instructures.component.html',
  styleUrls: ['./instructures.component.css']
})
export class InstructuresComponent implements OnInit {

  ngOnInit(): void {
    this.GetExperts();
  }
  constructor(private userS:UserService) {

  }

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

  GetExperts(){
    const users=this.userS.getExperts().subscribe((res:any)=>{
      // console.log(res.users);
      this.expertsArr=res.users;
      console.log(this.expertsArr);
      
      
  })}
}
