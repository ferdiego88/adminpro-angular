import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';
import { Medico } from '../../../models/medico.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];

  public medicosTemp: Medico[] = [];
  public totalMedicos = 0;
  public paginaDesde = 0;

  public cargando  = true;

  public imgSubs: Subscription = new Subscription();

  constructor(private medicosService: MedicoService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe((img: any) => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  abrirModal(medico: Medico){
    this.modalImagenService.abrilModal('medicos', medico._id, medico.img);
}


  cargarMedicos(){
    this.cargando =  true;
    this.medicosService.getMedicos()
    .subscribe(medicos => {
      console.log(medicos);
      this.cargando = false;
      this.medicos = medicos;
      this.medicosTemp = medicos;
    } );
  }

  guardarCambios(medico: Medico){
    console.log(medico.hospital?._id);
    this.medicosService.updateMedico(medico)
      .subscribe( resp => {
        Swal.fire('Actualizado', medico.nombre, 'success');
      });
  }


  buscar(termino: string): void{
    // console.log(termino);
    if (termino.length === 0) {
      this.medicos = this.medicosTemp;
      return;
    }
    this.busquedaService.buscar('medicos', termino)
      .subscribe(resultado => {
       console.log(resultado);
       this.medicos = resultado;
      });
  }

  eliminarMedico(medico: Medico){
    Swal.fire({
      title: `¿Esta seguro de eliminar a ${medico.nombre}? `,
      text:  `¡No se podrá revertir los cambios!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.deleteMedico(medico._id)
          .subscribe(resp => {
            console.log(resp);
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
            this.cargarMedicos();
          });
      }
  });
}
}
