import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



export interface UserProfile {
  nombre: string;
  email: string;
  edad: number;
  sexo: string;
  matricula: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  public isAuthenticated = new BehaviorSubject<boolean>(false); // Propiedad de autenticación

  url: string = 'http://localhost:8000';

  token: any = '';
  user: any = {};

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }


  //Registrar usuario
  addUser(user: any) {
    return this.http.post(this.url + '/api/register', user);
  }

  //Iniciar sesion
  loginIn(user: any) {
    return this.http.post(this.url + '/api/login', user);
  }

  //Guardar token en localStorage
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Guardar datos del usuario en localStorage
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

  }




  //Comprobar si esta autenticado el  usuario
  isAuth(): boolean {
    this.token = localStorage.getItem('token') || null;
    this.user = JSON.parse(localStorage.getItem('user') || 'null') || null;

    if (this.token === null || this.user === null) {
      return false
    } else {
      return true
    }

  }
  
  getAsesoriasStudent(): Observable<any> {
    // Obtener el token del local storage
    const token = localStorage.getItem('token');
    console.log(token);

    // Verificar si el usuario está autenticado
    if (this.isAuth() && token) {

      console.log('Entro al if');
      // Configurar las cabeceras con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Realizar la solicitud a la API utilizando el token en las cabeceras
      return this.http.get(this.url + '/api/verAsesorias', { headers });
    } else {
      // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
      // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
      // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }
  }


registrarCurso(id: number): Observable<any> {
    // Obtener el token del local storage
    console.log(id);

    const token = localStorage.getItem('token');
    console.log(token);

    // Verificar si el usuario está autenticado
    if (this.isAuth() && token) {

      console.log('Entro al if');
      // Configurar las cabeceras con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      // Realizar la solicitud a la API utilizando el token en las cabeceras
      return this.http.post(this.url + `/api/pedirAsesoria/${id}`,{}, { headers });
    } else {
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }
  }



}
