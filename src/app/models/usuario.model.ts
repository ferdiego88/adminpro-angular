import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ){

  }

  get ImagenUrl(): string{
    // Ruta Solicitud API Rest
    // /uploads/usuarios/10e94f4a-f217-4581-ad17-44bddd1s4f00af7.jpg
    //  console.log(this.img);
    if (this.img?.includes('https')) {
        return this.img;
    }
    if (this.img) {
      return `${base_url}/uploads/usuarios/${this.img}`;
    }else{
      return `${base_url}/uploads/usuarios/noimage.jpg`;
    }
  }
  // imprimirUsuario(){
  //   console.log(this.nombre);
  // }
}
