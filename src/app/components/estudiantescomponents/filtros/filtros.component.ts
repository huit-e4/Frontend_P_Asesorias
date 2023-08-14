import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { StudentsService } from 'src/app/services/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {
  categories: any[] = []; // Aquí almacenarás las categorías
  cats: any[] = []; //Me guarda las asesorias segun su id
  constructor(private user: UserService, private theForm: FormBuilder, private sanitizer: DomSanitizer, private us: StudentsService, private rou: Router) { }

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

  
  //Unirse al curso
  unirmeAlCurso(id: number) {
    this.us.registrarCurso(id).subscribe(
      () => {
        console.log('Registro exitoso');
        this.rou.navigate(['/homestudent/cursos-estudiante']);
        this.goodNot();
      },
      (error) => {
        console.error('Error al intentar registrarse:', error);
        this.badNot();
      }
    );
  }


  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Solo te puedes unir una vez al curso papu!'
    })
  }

  confirmarAlert(id: number) {
    Swal.fire({
      title: '¿Estás seguro de unirte al curso?',
      text: "No puedes revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.unirmeAlCurso(id); // Pasa el id como argumento a la función borrarAsesoria()
      }
    });
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Alta de curso exitosa!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  
  datosModal:any=null;
  verModal(Userdata:any){
    console.log(Userdata);
    this.datosModal=Userdata;
  }

}
