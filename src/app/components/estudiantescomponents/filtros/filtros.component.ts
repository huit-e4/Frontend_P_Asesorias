import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {
  categories: any[] = []; // Aquí almacenarás las categorías
  cats: any[] = []; //Me guarda las asesorias segun su id
  constructor(private user: UserService, private theForm: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.user.getAllCategorias().subscribe((data) => {
      this.categories = data.categorias;
      console.log('mi data', this.categories);
    });
    this.GetAsesorias();
  }

  asesoriaForm: FormGroup = this.theForm.group({
    categoria_id: ["", Validators.required],
  })

  validInput(campo: string) {
    return this.asesoriaForm.controls[campo].errors && this.asesoriaForm.controls[campo].touched

  }


  sendData() {
    const categoriaId = this.asesoriaForm.get('categoria_id')!.value;
      // Si se selecciona una categoría, obtén asesorías por categoría
      this.user.getCategoriaPorId(categoriaId).subscribe(
        (asesorias: any) => {
          // Mostrar los datos en la consola
          console.log('Datos de asesorias segun categ:', asesorias);
          this.cats = asesorias.asesorias;
        },
        (error) => {
          console.error('Error al obtener las asesorias:', error);
        }
      );
  }

  //Traigo todas las asesorias
  GetAsesorias(){
    // Llamar a la función getExperts() del servicio
    this.user.getAsesorias().subscribe(
      (cate: any) => {
        // Mostrar los datos en la consola
        console.log('Datos de asesorias estudiante:', cate);
        this.cats=cate.asesorias
      },
      (error) => {
        console.error('Error al obtener las asesorias:', error);
      }
    );
  }
  

  //Traigo la imagen
  getImgUrl(img_filename: string): SafeResourceUrl {
    const unsafeUrl = this.user.url + '/storage/imgscursos/' + img_filename;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

}
