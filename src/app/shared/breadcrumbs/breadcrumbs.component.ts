import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy   {
  public titulo = '';
  public tituloSubs$: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.getDataRuta()
      .subscribe( ({titulo}) => {
      this.titulo = titulo;
      document.title = `Admin Pro - ${titulo}`;
    } );
   }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

   getDataRuta(){
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data),
    );
   }


}
