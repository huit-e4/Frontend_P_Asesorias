import { OnInit } from '@angular/core';
import { Component, ElementRef } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-home-estudiante',
  templateUrl: './home-estudiante.component.html',
  styleUrls: ['./home-estudiante.component.css']
})
export class HomeEstudianteComponent implements OnInit {
  ngOnInit(): void {
    this.GetCursos();
  }
  constructor(private userS:UserService, private elementRef: ElementRef, private us: StudentsService, private sanitizer: DomSanitizer){

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = '#f5f6fa ';
}
  cursoArr:any[]=[];
  // GetAdmins(){
  //   const users=this.userS.getAdmins().subscribe((res:any)=>{
  //     // console.log(res.users);
  //     this.adminsArr=res.users;
  //     console.log(this.adminsArr);
      
      
  // })}

  GetCursos(){
    // Llamar a la función getExperts() del servicio
    this.userS.getAsesorias().subscribe(
      (cursoS: any) => {
        // Mostrar los datos en la consola
        // console.log('Datos del curso:', cursoS);
        this.cursoArr=cursoS.asesorias;
        console.log(this.cursoArr);
      },
      (error) => {
        console.error('Error al obtener los expertos:', error);
      }
    );
  }

  datosModal:any=null;
  verModal(Userdata:any){
    console.log(Userdata);
    this.datosModal=Userdata;
  }


  //Unirse al curso
  unirmeAlCurso(id: number) {
    this.us.registrarCurso(id).subscribe(
      () => {
        console.log('Registro exitoso');
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

  getImgUrl(img_filename: string): SafeResourceUrl {
    const unsafeUrl = this.userS.url + '/storage/imgscursos/' + img_filename;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

}
