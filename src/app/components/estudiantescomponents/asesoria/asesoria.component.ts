import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StudentsService } from '../../../services/students.service';

declare var $: any;

@Component({
  selector: 'app-asesoria',
  templateUrl: './asesoria.component.html',
  styleUrls: ['./asesoria.component.css']
})
export class AsesoriaComponent {

  asesoriasArr: any[] = [];

  constructor(private studentS: StudentsService) { }

  ngOnInit(): void {
    this.GetAsesorias();
  }

  GetAsesorias() {
    this.studentS.getAsesoriasStudent().subscribe(
      (admins: any) => {
        console.log('Datos de asesorias estudiante:', admins.asesorias);
        this.asesoriasArr = admins.asesorias;
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }

 
}