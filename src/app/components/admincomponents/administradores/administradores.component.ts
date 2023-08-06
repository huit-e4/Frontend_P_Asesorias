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
  
  eliminarAdmin(admin: any) {
    // Aquí debes implementar la lógica para eliminar el administrador.
    // Puedes utilizar el servicio this.userS.eliminarAdmin(admin.id) para eliminarlo del backend.

    // Una vez que el administrador ha sido eliminado correctamente, puedes actualizar la lista de administradores
    // para que el elemento desaparezca de la vista sin necesidad de recargar la página.

    // Ejemplo (solo como referencia, la implementación real dependerá de tu servicio y backend):
    this.userS.eliminaradmin(admin.id).subscribe(
      (response: any) => {
        console.log('Administrador eliminado:', response);
        this.adminsArr = this.adminsArr.filter((item) => item.id !== admin.id);
      },
      (error) => {
        console.error('Error al eliminar el administrador:', error);
      }
    );
  }


  
}