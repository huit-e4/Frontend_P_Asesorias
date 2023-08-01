import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent {
  ngOnInit(): void {
    this.getUser();
    //this.loadData();
  }





  constructor(private userS: UserService, private http: HttpClient) {
  }

  

    //loadData(){
    // Llamar a la función getExperts() del servicio
    //this.userS.getPerfil().subscribe(
    //(experts: any) => {
    // Mostrar los datos en la consola
    //console.log('Datos de expertos:', experts);
    //},
    // (error) => {
    //console.error('Error al obtener los expertos:', error);
    // }
    //);

    userD:any;;
    getUser(){
      const userL=JSON.parse(localStorage.getItem('user')||'[]');
      this.userD=userL;
      console.log(this.userD);
  
      
    }

}
