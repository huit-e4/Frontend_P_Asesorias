import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.component.html',
  styleUrls: ['./reuniones.component.css']
})
export class ReunionesComponent implements OnInit{
  constructor(private rou: ActivatedRoute, private theForm: FormBuilder, private usr: UserService, private router: Router) { }
  id_registro: any; //Guardo id
  registro_data: any = {}; // Inicializa como objeto vacío
  progress: number = 0;


  ngOnInit(): void {
    const id = parseInt(this.rou.snapshot.paramMap.get('id') || '');
    this.id_registro = id;
    console.log('Este es mi', this.id_registro);
    // this.getRegisterId(this.id_registro);
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

  saveRegister(){
    console.log(this.citaForm.value);
    
  }

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


}
