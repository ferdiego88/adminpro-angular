import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { map, tap, catchError} from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario!: Usuario;
  constructor(private http: HttpClient,
              private router: Router,
              private zone: NgZone)
  {
  this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.usuario.uid || '';
  }

  googleInit(){
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '410854257362-oqo465iqgpbri3p7oouok9aqo760dous.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          // scope: 'additional_scope'
        });
        resolve();
      });
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.zone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean>{
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {email, google, nombre, role, img, uid} = resp.usuarioDB;
        this.usuario = new Usuario(nombre, email, '', img , google, role, uid  );
        // this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }
  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  actualizarPerfil(data: {email: string, nombre: string, role?: string}){
    data = {
      ...data,
      role: this.usuario.role
    };
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,{
      headers: {
        'x-token': this.token
      }
    });
  }
  login(formData: LoginForm){
    if (formData.remember) {
      localStorage.setItem('email', formData.email);
    }else{
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}/login`, formData)
      .pipe(map((resp: any) => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario) );
        return true;
      }));
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token })
      .pipe(tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }));
  }
}
