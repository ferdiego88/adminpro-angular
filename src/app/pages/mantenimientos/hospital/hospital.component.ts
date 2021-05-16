import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: [
  ]
})
export class HospitalComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];

  public hospitalesTemp: Hospital[] = [];
  public totalHospitales = 0;
  public paginaDesde = 0;

  public cargando  = true;
  public imgSubs: Subscription = new Subscription();
  constructor(public hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe((img: any) => this.cargarHospitales());
  }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    this.cargando =  true;
    this.hospitalService.getHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
        // console.log(hospitales);
      });
  }

  guardarCambios(hospital: Hospital){
    // console.log(hospital);
    this.hospitalService.updateHospital(hospital._id, hospital.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  eliminarHospital(hospital: Hospital){
        Swal.fire({
          title: `¿Esta seguro de eliminar a ${hospital.nombre}? `,
          text:  `¡No se podrá revertir los cambios!`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.hospitalService.deleteHospital(hospital._id)
              .subscribe(resp => {
                console.log(resp);
                Swal.fire(
                  'Eliminado!',
                  'El usuario ha sido eliminado.',
                  'success'
                );
                this.cargarHospitales();
              });
          }
      });
  }


  async abrirSweetAlert(){
    const {value =  ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.createHospital(value)
        .subscribe ( (resp: any) => {
          this.hospitales.push(resp.hospital);
          Swal.fire({
            icon: 'success',
            title: 'Se guardó correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        }
        );
      }
    console.log(value);
  }
  abrirModal(hospital: Hospital){
      this.modalImagenService.abrilModal('hospitales', hospital._id, hospital.img);
  }

  buscar(termino: string): void{
    // console.log(termino);
    if (termino.length === 0) {
      this.hospitales = this.hospitalesTemp;
      return;
    }
    this.busquedaService.buscar('hospitales', termino)
      .subscribe(resultado => {
       console.log(resultado);
       this.hospitales = resultado;
      });
  }
}
