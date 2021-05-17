import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any = [];
  // menu: any[] = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/'},
  //       { titulo: 'ProgressBar', url: 'progress'},
  //       { titulo: 'Gráficas', url: 'grafica1'},
  //       { titulo: 'Promesas', url: 'promesas'},
  //       { titulo: 'RXJS', url: 'rxjs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios'},
  //       { titulo: 'Hospitales', url: 'hospitales'},
  //       { titulo: 'Medicos', url: 'medicos'},
  //     ]
  //   }
  // ];

  cargarMenu(){
    const menu = localStorage.getItem('menu');
    if (menu) {
      this.menu = JSON.parse(menu) || [];
    }
  }
}
