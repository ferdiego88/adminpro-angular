import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient ) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  getHospitales(){
    const url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: any) => resp.hospitales )
        );
  }

  createHospital(nombre: string){
    const url = `${base_url}/hospitales`;
    return this.http.post(url, {nombre}, this.headers);
  }

  updateHospital( _id: string | undefined , nombre: string){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, {nombre}, this.headers);
  }

  deleteHospital(_id: string | undefined){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
