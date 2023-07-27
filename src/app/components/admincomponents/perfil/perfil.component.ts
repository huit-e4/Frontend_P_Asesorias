import { Component } from '@angular/core';
import {  UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

interface Perfil {
  nombre: string;
  email: string;
  edad: number;
  sexo: string;
  matricula: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})


export class PerfilComponent {
  ngOnInit(): void {
   this.getPerfil();
    //this.loadData();
  }

 



  constructor(private userS:UserService, private http: HttpClient) {
  }

 

  expertsArr:any[]=[];

  getPerfil(){
    const users=this.userS.getPerfil().subscribe((res:any)=>{
      // console.log(res.users);
      this.expertsArr=res.users;
      console.log(this.expertsArr);
      
      
  })}

  loadData(){
    // Llamar a la función getExperts() del servicio
    this.userS.getPerfil().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', experts);
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }

}
