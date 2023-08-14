import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crearreunion',
  templateUrl: './crearreunion.component.html',
  styleUrls: ['./crearreunion.component.css']
})
export class CrearreunionComponent implements OnInit{

  constructor(private rou: ActivatedRoute, private theForm: FormBuilder, private usr: UserService, private router: Router) { }
  id_registro: any; //Guardo id
  registro_data: any = {}; // Inicializa como objeto vacío
  progress: number = 0;


  ngOnInit(): void {
    const id = parseInt(this.rou.snapshot.paramMap.get('id') || '');
    this.id_registro = id;
    console.log('Este es mi', this.id_registro);
    this.getRegisterId(this.id_registro);
  }

  citaForm: FormGroup = this.theForm.group({
    tema: ["",[Validators.required, Validators.minLength(10)]],
    urlmeet: ["",[Validators.required, Validators.minLength(10)]],
    fecha: ["",Validators.required],
  })


  validInput(campo: string){
    return this.citaForm.controls[campo].errors && this.citaForm.controls[campo].touched

  }
  updateProgress() {
    const totalFields = 3; // Cambia este valor si añades o quitas campos en el formulario
    const completedFields = Object.values(this.citaForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }

  // saveRegister(){
  //   console.log(this.citaForm.value);
    
  // }

  getRegisterId(id: number) {
    this.usr.getRegistroEstudiantePorId(id).subscribe(
      (registro: any) => {
        this.registro_data = registro; // Almacena el objeto completo recibido
        console.log('Mis datos', this.registro_data);
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  saveRegister() {
    // Crear un objeto FormData para agrupar los datos
    const formData = new FormData();
    
    // Agregar el dato de tipo string (razón) al FormData
    formData.append('tema', this.citaForm.get('tema')?.value);
    formData.append('urlmeet', this.citaForm.get('urlmeet')?.value);
    formData.append('fecha', this.citaForm.get('fecha')?.value);


    // Enviar el formData al backend utilizando HttpClient (por ejemplo, mediante el servicio UserService)
    this.usr.registrarCitaPorExperto(this.id_registro,formData).subscribe(
      (response) => {
        // Procesar la respuesta del backend si es necesario
        console.log('Respuesta del backend:', response);
        this.goodNot();
        this.router.navigate(['/homeexpert/reuniones']);
      },
      (error) => {
        // Manejar el error si la solicitud falla
        console.error('Error al enviar datos al backend:', error);
      }
    );

    // Restablecer el formulario después de enviar los datos
    this.citaForm.reset();
    this.updateProgress(); // Actualizar progreso después de guardar
  }


  goodNot(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cita registrada exitosamente!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }



}
