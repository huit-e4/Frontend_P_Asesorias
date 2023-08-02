import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

export interface Cv {
  id: number;
  razon: string;
  rutaCv: string;
  statuscv_id: number;
}

@Component({
  selector: 'app-infocv',
  templateUrl: './infocv.component.html',
  styleUrls: ['./infocv.component.css']
})
export class InfocvComponent {
  expertcv: Cv[] = []; // Usa la interfaz o tipo Cv para el arreglo


  ngOnInit(): void {
    this.getCvInfo();
  }

  constructor(private userS: UserService) {
  }

  getCvInfo() {
    this.userS.getCvActualUser().subscribe(
      (response: any) => {
        if (response && response.cv) {
          // Verifica si response.cv es un objeto y conviértelo en un arreglo si es necesario
          this.expertcv = Array.isArray(response.cv) ? response.cv : [response.cv];
          console.log(this.expertcv);
        } else {
          console.error('Datos del CV no recibidos correctamente desde el backend.');
        }
      },
      (error) => {
        console.error('Error al obtener los datos del CV', error);
      }
    );
  }


}
