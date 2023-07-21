import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private users: User[] = [];

  public isAuthenticated = new BehaviorSubject<boolean>(false); // Propiedad de autenticación

  url:string = 'http://localhost:8000';

  token: any = '';
  user: any = {};

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

   // Función para obtener el valor de isAuthenticated como un Observable
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
  
}
