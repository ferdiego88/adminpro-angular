import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get  headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformarUsuarios(resultado: any): Usuario[] {
    return resultado.map(
        (user: any) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
    );
  }
  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string){

    // http://localhost:3000/api/todo/coleccion/usuarios/ferna
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultado);
              break;

            default:
              return [];
          }
        }));
  }
}
