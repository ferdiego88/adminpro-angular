import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit {

 @Input()titulo = '';
 @Input()labels: Label[] = [];
 @Input()data: MultiDataSet = [];
// Doughnut
public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData: MultiDataSet = [
  [350, 450, 100],
];
public doughnutChartType: ChartType = 'doughnut';
public colors: Color[] = [
  {backgroundColor: ['#3f37c9', '#00b4d8', '#FFB414']}
];

ngOnInit(){
  this.doughnutChartData = this.data;
  this.doughnutChartLabels = this.labels;
}

}
