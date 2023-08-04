import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-infocv',
  templateUrl: './infocv.component.html',
  styleUrls: ['./infocv.component.css']
})
export class InfocvComponent {
expertcv:any //Para la data del cv

  ngOnInit(): void {
    this.getCvInfo();
  }

  constructor(public userS: UserService, private sanitizer: DomSanitizer) {
  }

  //Obtengo la info del cv del experto con sesion iniciada
  getCvInfo() {
    this.userS.getCvActualUser().subscribe(
      (response: any) => {
        if (response && response.cv) {
          this.expertcv = response.cv; // Sin convertir a un arreglo
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

 
  /**
 * Obtiene la URL segura para cargar un archivo PDF a partir del nombre del archivo.
 * @param pdf_filename El nombre del archivo PDF que se utilizará para construir la URL.
 * @returns La URL segura del archivo PDF para ser incrustada en un elemento <embed>.
 */
  getPdfUrl(pdf_filename: string): SafeResourceUrl {
    const unsafeUrl = this.userS.url + '/storage/pdf/' + pdf_filename;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
  

  


}
