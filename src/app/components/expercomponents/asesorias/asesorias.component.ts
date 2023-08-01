import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

interface Curso {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
  active: boolean;
}

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.css']
})

export class AsesoriasComponent {

  

}
