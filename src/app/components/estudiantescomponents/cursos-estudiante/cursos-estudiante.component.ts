import { Component, ElementRef, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Curso } from 'src/app/interfaces/curso';
import { StudentsService } from 'src/app/services/students.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cursos-estudiante',
  templateUrl: './cursos-estudiante.component.html',
  styleUrls: ['./cursos-estudiante.component.css']
})
export class CursosEstudianteComponent implements OnInit{
  
  ngOnInit(): void {
    this.GetAsesorias();
  }
  constructor(private studentS:StudentsService){

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



}
