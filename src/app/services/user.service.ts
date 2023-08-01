import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';

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

  // getExperts() {
  //   return this.http.get(this.url + '/api/experts');
  // }
  // getAdmins() {
  //   return this.http.get(this.url + '/api/admins');
  // }

  getAdmins(): Observable<any> {
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
      return this.http.get(this.url + '/api/admins', { headers });
    } else {
      // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
      // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
      // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }}


  getEstudiantes(): Observable<any> {
    //return this.http.get(this.url + '/api/students');
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
    return this.http.get(this.url + '/api/students', { headers });
  } else {
    // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
    // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
    // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
    return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
  }
  }

  getUser(): Observable<any> {
    //return this.http.get(this.url + '/api/students');
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
    return this.http.get(this.url + '/api/users', { headers });
  } else {
    // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
    // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
    // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
    return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
  }
  }

  

 // getUserProfile(): Observable<UserProfile> {
   // return this.http.get<UserProfile>(this.url);
  //}


  getExperts(): Observable<any> {
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
      return this.http.get(this.url + '/api/experts', { headers });
    } else {
      // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
      // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
      // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }
  }

  getCvs(): Observable<any> {
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
      return this.http.get(this.url + '/api/cvs', { headers });
    } else {
      // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
      // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
      // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }
  }

  aprobarCv(id:number): Observable<any> {
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
const body={razon:"jdkfjdlk"}
      // Realizar la solicitud a la API utilizando el token en las cabeceras
      return this.http.put(this.url + `/api/actualizarCv/${id}`, body,{ headers });
    } else {
      // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
      // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
      // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }
  }
  getCursos() { 
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
      return this.http.get(this.url + '/api/asesorias', { headers });
    } else {
      // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
      // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
      // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }
  }


//Cerrar sesion en cualquier rol
  logOut(): Observable<any> {
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
      return this.http.get(this.url + '/api/logout', { headers });
    } else {
      // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
      // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
      // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }}
//funciom para traer asesorias 
    getAsesorias(): Observable<any> {
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
        return this.http.get(this.url + '/api/asesorias', { headers });
      } else {
        // Si el usuario no está autenticado o no hay token, redirigir a la página de inicio de sesión u otra página apropiada.
        // Por ejemplo, puedes utilizar un guard para proteger la ruta y redirigir en caso de que el usuario no esté autenticado.
        // Aquí retornamos un observable vacío, pero puedes manejar el redireccionamiento según tu lógica.
        return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
      }}
  
}
