import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-solicitudes-r',
  templateUrl: './tabla-solicitudes-r.component.html',
  styleUrls: ['./tabla-solicitudes-r.component.css']
})
export class TablaSolicitudesRComponent implements OnInit {
  ngOnInit(): void {
  
    this.loadDataSolicitudes();
  }
  constructor(private userS:UserService, private sanitizer: DomSanitizer) {

  }

  pageSize = 9; // Cantidad de estudiantes por página
  currentPage = 1; // Página actual
  sortBy = 'default'; // Criterio de ordenación inicial

  // Función para cambiar el criterio de ordenación
  changeSortBy(criteria: string) {
    this.sortBy = criteria;
    this.sortExperts();
  }

  // Función para ordenar los estudiantes según el criterio seleccionado
  sortExperts() {
    this.solicitudesArr.sort((a, b) => {
      if (this.sortBy === 'nombre') {
        return a.name.localeCompare(b.name); // Ordenar por nombre (orden alfabético)
      } 
      // else if (this.sortBy === 'edad') {
      //   return a.edad - b.edad; 
      // }
      return 0;
    });
    this.setPage(this.currentPage); // Redefinir la página actual después de ordenar
  }

  // Obtener los estudiantes para la página actual
  getExpertsForCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.solicitudesArr.slice(startIndex, endIndex);
  }

  // Cambiar la página actual
  setPage(page: number) {
    this.currentPage = page;
  }

  // Obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.solicitudesArr.length / this.pageSize);
  }

  // Obtener un array con los números de página
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  // GetExperts(){
  //   const users=this.userS.getExperts().subscribe((res:any)=>{
  //     // console.log(res.users);
  //     this.solicitudesArr=res.users;
  //     console.log(this.solicitudesArr);
      
      
  // })}

  
  solicitudesArr:any[]=[]
  loadDataSolicitudes(){
    this.userS.getCvsRechazados().subscribe(
      (solicitudes: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de cvs:', solicitudes);
        this.solicitudesArr=solicitudes.cvs
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

  AprobarCv(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Aceptar la solicitud?',
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
            console.log('Datos de cvs:', res);
            swalWithBootstrapButtons.fire(
              '¡Aceptado!',
              'La solicitud ha sido aceptada',
              'success'
            )
          },
          (error) => {
            console.error('Error al aprobar cv:', error);
          }
        );
      
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
      
      }
    })
  }
  getPdfUrl(pdf_filename: string): SafeResourceUrl {
    const unsafeUrl = this.userS.url + '/storage/pdf/' + pdf_filename;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
}
