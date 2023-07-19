import { Component } from '@angular/core';

@Component({
  selector: 'app-c-administrador',
  templateUrl: './c-administrador.component.html',
  styleUrls: ['./c-administrador.component.css']
})
export class CAdministradorComponent {
  
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  isProfileOpen = false;



toggleProfileOptions() {
  this.isProfileOpen = !this.isProfileOpen;
}
}
