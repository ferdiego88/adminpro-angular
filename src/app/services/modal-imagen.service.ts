import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
 // tslint:disable-next-line: variable-name
 private _ocultarModal = true;
 public tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
 public id ? = '';
 public img = '';

 public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  get ocultarModal(): boolean{
    return this._ocultarModal;
  }

  abrilModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id?: string, img = 'no-image'): void{
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // this.img = img;
    // http://localhost:3000/api/uploads/usuarios/10e94f4a-f217-4581-ad17-44bddd1s4f00af7.jpg
    if (img.includes('https')) {
        this.img = img;
    }else{
      this.img = `${base_url}/uploads/${tipo}/${img}`;
    }
  }


  cerrarModal(): boolean{
    return this._ocultarModal = true;
  }
}
