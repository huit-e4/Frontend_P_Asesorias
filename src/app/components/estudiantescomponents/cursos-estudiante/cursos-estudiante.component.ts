import { Component, ElementRef, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Curso } from 'src/app/interfaces/curso';
import { StudentsService } from 'src/app/services/students.service';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cursos-estudiante',
  templateUrl: './cursos-estudiante.component.html',
  styleUrls: ['./cursos-estudiante.component.css']
})
export class CursosEstudianteComponent implements OnInit{
  
  ngOnInit(): void {
    this.GetAsesorias();
  }
  constructor(private studentS:StudentsService, private user:UserService,  private sanitizer: DomSanitizer, private rou: Router){

  }

  asesoriasArr:any[]=[];
  // GetAdmins(){
  //   const users=this.userS.getAdmins().subscribe((res:any)=>{
  //     // console.log(res.users);
  //     this.asesoriasArr=res.users;
  //     console.log(this.asesoriasArr);
      
      
  // })}

  GetAsesorias(){
    // Llamar a la función getExperts() del servicio
    this.studentS.getAsesoriasStudent().subscribe(
      (admins: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de asesorias estudiante:', admins.asesorias);
        this.asesoriasArr=admins.asesorias;
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }

  datosModal:any=null;
  verModal(Userdata:any){
    console.log(Userdata);
    this.datosModal=Userdata;
  }
  
  // eliminarAdmin(admin: any) {
   
  //   this.userS.eliminaradmin(admin.id).subscribe(
  //     (response: any) => {
  //       console.log('Administrador eliminado:', response);
  //       this.asesoriasArr = this.asesoriasArr.filter((item) => item.id !== admin.id);
  //     },
  //     (error) => {
  //       console.error('Error al eliminar el administrador:', error);
  //     }
  //   );
  // }

  //Traigo la imagen
  getImgUrl(img_filename: string): SafeResourceUrl {
    const unsafeUrl = this.studentS.url + '/storage/imgscursos/' + img_filename;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }


  //Borrar asesoria por id
  borrarAsesoria(id: number) {
    // Llamar a la función deleteAsesoriaById() del servicio para eliminar la asesoría por su ID
    this.user.deleteAsesoriaPorEstudiante(id).subscribe(
      () => {
        console.log('Asesoría abandonada con éxito');
        this.rou.navigate(['/homestudent']);
        this.goodNot();
      },
      (error) => {
        console.error('Error al abandonar la asesoría:', error);
        this.badNot();
      }
    );
  }


  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'La acción no se ejecutó correctamente!'
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
      }
    });
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Asesoria abandonada exitosamente!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }




}
