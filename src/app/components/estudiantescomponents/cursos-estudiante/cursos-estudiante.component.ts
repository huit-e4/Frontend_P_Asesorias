import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Curso } from 'src/app/interfaces/curso';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cursos-estudiante',
  templateUrl: './cursos-estudiante.component.html',
  styleUrls: ['./cursos-estudiante.component.css']
})
export class CursosEstudianteComponent implements OnInit{

  cursos: Curso[] = [];

  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.getAllCursos();
    // obtiene la lista de productos del servicio
    this.userService.getCursos()
      .pipe(
        catchError((error) => {
          console.error(error);
          // manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
          return [];
        })
      )
      .subscribe((cursos: Curso[]) => {
        // y actualiza la propiedad products en el componente
        this.cursos = cursos;
      });
    
  }


  getAllCursos() {
    this.userService.getCursos()
      .pipe(
        catchError((error) => {
          console.error(error);
          // manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
          return [];
        })
      )
      .subscribe((cursos: Curso[]) => {
        this.cursos = cursos;
        console.log(cursos);
      });
  }

}
