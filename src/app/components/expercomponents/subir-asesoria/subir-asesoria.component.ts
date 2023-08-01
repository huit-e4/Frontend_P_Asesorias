import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subir-asesoria',
  templateUrl: './subir-asesoria.component.html',
  styleUrls: ['./subir-asesoria.component.css']
})
export class SubirAsesoriaComponent {

  persona= {
    nombre:'',
    costo:0,
    descripcion:''

  }

  procesar() {
    if (this.persona.costo > 9000) {
      this.persona.costo = 9000; // Limitamos el costo a 9000 pesos
      alert('El costo no puede rebasar los 9000 pesos.');
    }
    console.log(this.persona);
  }
}
