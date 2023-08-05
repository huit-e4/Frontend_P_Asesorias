import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

interface Registro {
  id: number;
  nombre: string;
  desc: string;
  precio: string;
  active: number;
  user: {
    id: number;
    name: string;
    mat: string;
    lastname: string;
    edad: number;
    sexo: string;
    // ... other user properties
  };
}
interface Curso {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
  active: boolean;
}

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  registros: Registro[] = [];

  constructor(private userS: UserService) {}

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos() {
    this.userS.getVerAsesorias().subscribe(
      (data: any) => {
        this.registros = data.registros.map((registro: any) => ({
          id: registro.infoa_id,
          nombre: registro.user.name,
          desc: registro.user.email, // Adjust this to the desired property
          precio: registro.user.mat, // Adjust this to the desired property
          active: registro.user.active,
          user: {
            id: registro.user.id,
            name: registro.user.name,
            mat: registro.user.mat,
            lastname: registro.user.lastname,
            edad: registro.user.edad,
            sexo: registro.user.sexo,
            // ... other user properties
          }
        }));
      },
      (error) => {
        console.error('Error al obtener los cursos:', error);
      }
    );
  }
  
}
