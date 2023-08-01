import { Component } from '@angular/core';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})

export class AsesoriasComponent {

  // Cargar los datos de los expertos
  loadData() {
    this.userS.getExperts().subscribe(
      (experts: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de expertos:', experts);
        this.expertsArr = experts.users;
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }
}
