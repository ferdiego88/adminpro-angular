import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalUsuarios = 0;
  public paginaDesde = 0;
  public loading = true;
  public imgSubs: Subscription = new Subscription();
  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { }



  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe
      ((img: any) => {
        console.log(img);
        this.cargarUsuarios();
        } );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }



  cargarUsuarios(): void{
    this.loading = true;
    this.usuarioService.getUsuarios(this.paginaDesde)
    .subscribe(({total, usuarios}) => {
      // console.log(usuarios);
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.totalUsuarios = total;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  cambiarPagina(valor: number){
    this.paginaDesde += valor;
    if (this.paginaDesde < 0) {
      this.paginaDesde = 0;
    }else if (this.paginaDesde > this.totalUsuarios){
      this.paginaDesde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string){
    // console.log(termino);
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.busquedaService.buscar('usuarios', termino)
      .subscribe((resultado: any) => {
      //  console.log(resultado);
        this.usuarios = resultado;
      });
  }

  eliminarUsuario(usuario: Usuario){
    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede borrar su misma cuenta', 'error');
      return;
    }
    // console.log('Esto no se tiene que ver');
    // return;
    Swal.fire({
      title: `¿Esta seguro de eliminar a ${usuario.nombre}? `,
      text:  `¡No se podrá revertir los cambios!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario.uid)
          .subscribe(resp => {
            console.log(resp);
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
            this.cargarUsuarios();
          });
      }
    });

  }

  cambiarRole(usuario: Usuario){
    this.usuarioService.guardarUsuario(usuario)
      .subscribe( resp => console.log(resp));

  }
  abrirModal(usuario: Usuario){
    this.modalImagenService.abrilModal('usuarios', usuario.uid, usuario.img);
  }
}
