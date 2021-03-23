import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios => console.log(usuarios));
  // Declaracion de una Promesa
  //   const promesa = new Promise( (resolve, reject) => {
  //     if (true) {
  //       resolve('Hola Mundo');
  //     } else {
  //       reject('Algo Salio Mal');
  //     }
  //   });

  //   promesa.then( (mensaje) => {
  //     console.log('Hey Terminé', mensaje);
  //   })
  //   .catch( error => console.log('Error en mi promsesa', error));

  //   console.log('Fin del Init');
  }

  getUsuarios(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data) );
    });
  }
}
