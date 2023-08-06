import { OnInit } from '@angular/core';
import { Component, ElementRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css']
})
export class HomeEstudianteComponent implements OnInit {
  ngOnInit(): void {
    this.GetCursos();
  }
  constructor(private userS:UserService, private elementRef: ElementRef){

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#f5f6fa ';
}
  cursoArr:any[]=[];
  // GetAdmins(){
  //   const users=this.userS.getAdmins().subscribe((res:any)=>{
  //     // console.log(res.users);
  //     this.adminsArr=res.users;
  //     console.log(this.adminsArr);
      
      
  // })}

  GetCursos(){
    // Llamar a la función getExperts() del servicio
    this.userS.getAsesorias().subscribe(
      (cursoS: any) => {
        // Mostrar los datos en la consola
        console.log('Datos del curso:', cursoS);
        this.cursoArr=cursoS.asesorias;
        console.log(this.cursoArr);
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
}
