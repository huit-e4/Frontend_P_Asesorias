import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit{
  ngOnInit(): void {
    this.GetAdmins();
  }
  constructor(private userS:UserService, private elementRef: ElementRef){

  }
<<<<<<< HEAD
  adminsArr:any[]=[];
  GetAdmins(){
    const users=this.userS.getAdmins().subscribe((res:any)=>{
      // console.log(res.users);
      this.adminsArr=res.users;
      console.log(this.adminsArr);
      
      
  })}
}
=======
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#f5f6fa ';
}
  adminsArr:any[]=[];
  // GetAdmins(){
  //   const users=this.userS.getAdmins().subscribe((res:any)=>{
  //     // console.log(res.users);
  //     this.adminsArr=res.users;
  //     console.log(this.adminsArr);
      
      
  // })}

  GetAdmins(){
    // Llamar a la función getExperts() del servicio
    this.userS.getAdmins().subscribe(
      (admins: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', admins);
        this.adminsArr=admins.users;
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
>>>>>>> adminCompHA
