import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.css']
})
export class CargarCvComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.log("No file selected!");
      return;
    }

    const uploadUrl = 'URL_DEL_ENDPOINT_DE_CARGA'; // Reemplaza por la URL del endpoint donde se subirá el archivo

    let formData = new FormData();
    formData.append('upload', this.selectedFile);

    const req = new HttpRequest('POST', uploadUrl, formData, {
      reportProgress: true,
    });

    this.http.request(req)
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded );
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
        }
      );
  }
}
