import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer | null;
  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
    this.usuario = usuarioService.usuario;
    this.imgTemp = '';
               }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp => {
        const {nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Se actualizó la información del Usuario', 'success');
      }, (err) => {
        Swal.fire('Error al Guardar', err.error.msg, 'error');
      });
  }
  cambiarImagen(event: any){
    const file = event.target.files[0];
    this.imagenSubir = file;
    if (!file) {
      this.imgTemp = null;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Se actualizó la imagen del Usuario', 'success');
      });
  }
}
