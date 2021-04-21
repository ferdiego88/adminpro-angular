import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  // public ocultarModal = false;
  public imagenSubir!: File;
  public imgTemp: string | ArrayBuffer | null;
  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) {
    this.imgTemp = '';
  }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;
    // this.ocultarModal = true;
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then( img => {
        Swal.fire('Guardado', 'Se actualizó la imagen del Usuario', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.closeModal();
      }).catch( err => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }
}
