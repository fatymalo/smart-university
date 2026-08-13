import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import {
  Chart,
  ChartConfiguration,
  ChartType,
  registerables
} from 'chart.js';


Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {



  // Graphique évolution inscriptions

  public lineChartData: ChartConfiguration['data'] = {

    labels: [
      'Jan',
      'Fév',
      'Mars',
      'Avril',
      'Mai',
      'Juin'
    ],

    datasets: [

      {
        label: 'Nouvelles inscriptions',

        data: [
          300,
          450,
          520,
          700,
          900,
          1200
        ],

        borderColor: '#2563EB',

        backgroundColor: 'rgba(37,99,235,0.2)',

        fill: true,

        tension: 0.4

      }

    ]

  };


 public lineChartOptions: ChartConfiguration['options'] = {

    responsive:true,

    maintainAspectRatio:false,

    plugins:{
      legend:{
        position:'bottom'
      }
    }

};


  public lineChartType: ChartType = 'line';



  // Graphique répartition étudiants

  public doughnutChartData: ChartConfiguration['data'] = {

    labels:[
      'Informatique',
      'Gestion',
      'Médecine',
      'Droit'
    ],

    datasets:[

      {

        data:[
          40,
          25,
          20,
          15
        ],

        backgroundColor:[

          '#2563EB',
          '#16A34A',
          '#F59E0B',
          '#7C3AED'

        ]

      }

    ]

  };


  public doughnutChartType: ChartType = 'doughnut';


public doughnutChartOptions: ChartConfiguration['options'] = {

    responsive:true,

    maintainAspectRatio:false,

    plugins:{
      legend:{
        position:'bottom'
      }
    }

};


}
