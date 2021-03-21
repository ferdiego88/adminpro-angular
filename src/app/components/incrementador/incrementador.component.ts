import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent  {
  // @Input('valor') progreso = 40;
  @Input() progreso = 40;
  @Input() btnClass = 'btn btn-primary';
  @Output() valorProgreso: EventEmitter<number> = new EventEmitter();
  constructor() { }

    cambiarValor(valor: number){
      if (this.progreso >= 100 && valor >= 0) {
        this.valorProgreso.emit(100);
        return this.progreso = 100;
      }

      if (this.progreso <= 0 && valor < 0) {
        this.valorProgreso.emit(0);
        return this.progreso = 0;
      }
      this.valorProgreso.emit(this.progreso);
      return this.progreso += valor;
    }

    onChange(nuevoValor: number){
      if (nuevoValor >= 100) {
          this.progreso = 100;
      } else if (nuevoValor <= 0) {
        this.progreso = 0;
      }else{
        this.progreso = nuevoValor;
      }
      this.valorProgreso.emit(this.progreso);
    }

}
