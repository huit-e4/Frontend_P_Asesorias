import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

interface Experto {
  id: number;
  name: string;
  lastname: string;
  mat:string;
  edad: number;
  sexo: string;
  email: string;
}

@Component({
  selector: 'app-tabla-de-expert',
  templateUrl: './tabla-de-expert.component.html',
  styleUrls: ['./tabla-de-expert.component.css']
})




export class TablaDeExpertComponent {

  ngOnInit(): void {
    this.getEstudiantes();
    //this.loadData();
  }

  constructor(private userS:UserService, private rou: Router) {
  }


  //estudiantes = [
   // { id: 1, nombre: 'Juan', edad: 25, correo: 'juan@example.com' },
   // { id: 2, nombre: 'María', edad: 30, correo: 'maria@example.com' },
   // { id: 3, nombre: 'Pedro', edad: 28, correo: 'pedro@example.com' },
   // { id: 4, nombre: 'Ana', edad: 22, correo: 'ana@example.com' },
   // { id: 5, nombre: 'goku', edad: 25, correo: 'juan@example.com' },
   // { id: 6, nombre: 'Maa', edad: 30, correo: 'maria@example.com' },
   // { id: 7, nombre: 'radi', edad: 28, correo: 'pedro@example.com' },
   // { id: 8, nombre: 'Tiapaola', edad: 22, correo: 'ana@example.com' },
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
 
  // Obtener los estudiantes para la página actual
  getStudentsForCurrentPage(): Experto[] {
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
    const users=this.userS.getExperts().subscribe((res:any)=>{
      // console.log(res.users);
      this.expertsArr=res.users;
      console.log(this.expertsArr);
      
      
  })}

  modificarEstudiante(estudiante: Experto) {
    alert(`Modificar estudiante: ${estudiante.name}`);
    
  }

  // Función para eliminar estudiante (simplemente muestra un mensaje por ahora)// segun Jose Armado esta te desactiva 
  eliminarEstudiante(estudiante: Experto) {
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
    this.userS.getExperts().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', experts);
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }
//Aca es donde le das al boton de desactivar segun Jose Armando, autor 
  eliminar(id:number, ){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Deseas desactivar a este Experto?',
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
            console.log('Datos de el Experto:', res);
            swalWithBootstrapButtons.fire(
              '¡Desactivación éxitosa!',
              'Estudiante a sido desactivado',
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

  editarUsuario(id: number){
    console.log('TESING', id);
    this.rou.navigateByUrl(`homeadmin/editarexperto/${id}`); 

    
  }

}
