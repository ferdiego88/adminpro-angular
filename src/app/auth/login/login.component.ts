import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit  {
  email!: string;
  public auth2: any;
  public loginForm = new FormGroup({
    email : new FormControl ('', [Validators.required, Validators.email]),
    password : new FormControl ('', [Validators.required]),
    remember : new FormControl (false),
  } );
  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private zone: NgZone) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.loginForm.controls.remember.setValue(true);
    }
    this.renderButton();
  }



  login(): void{
    this.usuarioService.login(this.loginForm.value)
      .subscribe(correcto => this.router.navigate(['/dashboard']), err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }



     renderButton(): void {
      gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        // onsuccess: this.onSuccess,
        // onfailure: this.onFailure
    });
      this.startApp();
  }


  async startApp()  {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));

  }

    attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe(resp => {
            // TODO: Navegar al Dashboard
            this.zone.run(() => {
              this.router.navigateByUrl('/');
            })
          });
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
