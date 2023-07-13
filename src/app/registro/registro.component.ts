import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  respuestaSeleccionada: string | undefined;
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      Rol: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      matricula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

}

submitForm() {
  if (this.registroForm) {
    // El formulario es válido, puedes enviar los datos o realizar otras acciones aquí
    console.log(this.registroForm.value);
  } else {
    // El formulario es inválido, muestra los errores o realiza acciones adicionales
    console.log('Formulario inválido. Por favor, revisa los campos.');
  }
}

submit() {
  if (this.respuestaSeleccionada) {
    // Aquí puedes realizar acciones con la respuesta seleccionada
    console.log('Respuesta seleccionada:', this.respuestaSeleccionada);
  } else {
    // Si no se selecciona ninguna respuesta, muestra un mensaje de error o realiza acciones adicionales
    console.log('Por favor, selecciona una respuesta.');
  }
}



}
