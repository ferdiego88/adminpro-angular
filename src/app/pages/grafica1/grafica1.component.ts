import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  public labels1 = ['Descarga de Ventas', 'Ventas en Tienda', 'Órdenes de Venta'];
  public data1 = [
    [250, 450, 360],
  ];
  public labels2 = ['Descarga de Compras', 'Compras en Tienda', 'Órdenes de Compras'];
  public data2 = [
    [750, 630, 320],
  ];
  public labels3 = ['Lista de Clientes', 'Ventas por Cliente', 'Pedidos de Clientes'];
  public data3 = [
    [100, 278, 630],
  ];
  public labels4 = ['Listado de Proveedores', 'Compras en Proveedores', 'Órdenes de Proveedores'];
  public data4 = [
    [240, 320, 620],
  ];

}
