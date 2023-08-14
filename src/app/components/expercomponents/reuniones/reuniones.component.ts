import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.css']
})
export class ReunionesComponent implements OnInit {
  ngOnInit(): void {
  
    this.GetReunionesExp();
  }
  constructor(private userS:UserService, ) {

  }
  @ViewChild('closeModalButton') closeModalButtonRef!: ElementRef;
  pageSize = 4; // Cantidad de Instructores por página
  currentPage = 1; // Página actual
  sortBy = 'default'; // Criterio de ordenación inicial

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortusers();
  }

  // Función para ordenar los Instructores según el criterio seleccionado
  sortusers() {
    this.reunionesArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.tema.localeCompare(b.tema); // Ordenar por nombre (orden alfabético)
      } else if (this.sortBy === 'edad') {
        return a.estado - b.edad; // Ordenar por edad (de menor a mayor)
      } else if (this.sortBy === 'fecha') {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }

  // Obtener los Instructores para la página actual
  getusersForCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.reunionesArr.slice(startIndex, endIndex);
  }

  // Cambiar la página actual
  setPage(page: number) {
    this.currentPage = page;
  }

  // Obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.GetReunionesExp.length / this.pageSize);
  }

  // Obtener un array con los números de página
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
  

  
  reunionesArr:any[]=[]
  estadosCita:any[]=[]

  GetReunionesExp(){
    this.userS.getReunionesExp().subscribe(
      (solicitudes: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de reuniones:', solicitudes);
        this.reunionesArr=solicitudes
        
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }

  datosSolicitud:any=null;

  verSolicitud(datos:any){
    this.datosSolicitud=datos
    console.log(this.datosSolicitud);
    
  }

  Aprobar(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Aceptar ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userS.aprobarCv(id).subscribe(
          (res: any) => {
            // Mostrar los datos en la consola
            console.log('Datos de reunion:', res);
            // if (id === res.cvid) {
            //   this.reunionesArr = this.reunionesArr.filter((datoscv) => datoscv.id !== res.cvid);
            //   this.cerrarModal()
            // } 
              this.reunionesArr = this.reunionesArr.filter((datoscv) => datoscv.id !== id);
              this.cerrarModal()
            swalWithBootstrapButtons.fire(
              '¡Aceptado!',
              'ha sido aceptado',
              'success'
            )
          },
          (error) => {
            console.error('Error al realizr:', error);
          }
        );
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      
      }
    })
  }



  cerrarModal(){
    this.closeModalButtonRef.nativeElement.click();
  }

  
 
 
 

}
