import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../../services/hospital.service';
import { MedicoService } from '../../../../services/medico.service';
import { Medico } from '../../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-mantenimientomedico',
  templateUrl: './mantenimientomedico.component.html',
  styles: [
  ]
})
export class MantenimientomedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRouter: ActivatedRoute)
  {
   // this.medicoForm = this.fb.group({});
    this.hospitalSeleccionado = ({nombre: ''});
    this.medicoSeleccionado = ({nombre: ''});
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.activatedRouter.params.subscribe(({id}) => {
      this.cargarMedico(id);
    });


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
    this.listenerHospital();
  }

  listenerHospital(){
    this.medicoForm.controls.hospital.valueChanges
      .subscribe((hospitalId: string) => {
        this.seleccionarHospital(hospitalId);

      });
  }

  seleccionarHospital(hospitalId: string){
    const hospital = this.hospitales.find(hosp => hosp._id === hospitalId);
    if (hospital?._id) {
      this.hospitalSeleccionado = hospital;
    }else{
      this.hospitalSeleccionado.nombre = '';
    }

  }

  guardarMedico(): void{
    console.log(this.medicoSeleccionado);
    const {nombre} = this.medicoForm.value;
    if (this.medicoSeleccionado.nombre !== '') {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      this.medicoService.updateMedico(data)
        .subscribe(resp => {
          console.log(resp);
          Swal.fire('actualizado', `${nombre} actualizado correctamente`, 'success');
        });

    } else {
      // crear
      this.medicoService.createMedico(this.medicoForm.value)
      .subscribe( (resp: any) => {
        console.log(resp);
        Swal.fire('creado', `${nombre} creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      });
    }
  }

  cargarHospitales(): void{
    this.hospitalService.getHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  cargarMedico(id: string): void{
    if (id === 'nuevo') {
      return;
    }
    this.medicoService.getMedicoById(id)
        .pipe(
          delay(100)
        )
        .subscribe( medico => {
          if (!medico) {
            this.router.navigateByUrl('/dashboard/medicos');
            return;
          }
          const {nombre, hospital: {_id}} = medico;
          this.medicoSeleccionado = medico;
          this.medicoForm.setValue({nombre, hospital: _id});
           //  console.log(this.medicoForm.value);
        }
        );
  }

}
