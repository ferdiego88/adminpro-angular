import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css'
  ]
})
export class RegisterComponent {
  public formSubmitted = false;
  public registerForm = this.fb.group({
    nombre : ['Flavia Marin', [Validators.required, Validators.minLength(3)]],
    email : ['flavio@gmail.com', [Validators.required, Validators.email]],
    password : ['123456', Validators.required],
    password2 : ['123456', Validators.required],
    terminos : [true, Validators.required],

  }, {
   validators: this.passwordsIguales('password', 'password2')
  } );

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }


  crearUsuario(): void{
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm.invalid);
    if (this.registerForm.invalid || this.aceptarTerminos()) {
      return;
    }
    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
        .subscribe(resp => {
          // console.log('Usuario Creado');
          // console.log(resp);
          this.router.navigateByUrl('/');
        }, (err) => {
          // Si sucede un Error
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  campoNoValido(campo: string): boolean{
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;

    } else {
      return false;
    }
  }
  aceptarTerminos(): boolean{
    return !this.registerForm.controls.terminos.value && this.formSubmitted;
  }

  passwordValido(): boolean{
    const pass1 = this.registerForm.controls.password.value;
    const pass2 = this.registerForm.controls.password2.value;
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  passwordsIguales(pass1: string, pass2: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual: true});
      }
    };
  }
}
