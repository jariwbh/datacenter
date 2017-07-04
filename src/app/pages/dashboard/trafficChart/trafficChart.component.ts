import { Router } from '@angular/router';
import { CommonDataService } from './../../../core/services/common/common-data.service';
import { Component } from '@angular/core';

import { TrafficChartService } from './trafficChart.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'traffic-chart',
  templateUrl: './trafficChart.html',
  styleUrls: ['./trafficChart.scss'],
})

// TODO: move chart.js to it's own component
export class TrafficChart {

  public doughnutData: Object[];
  mapData:Object;

  constructor(
    private trafficChartService: TrafficChartService, private _CommonDataService: CommonDataService, 
   private _router: Router) {
    this.doughnutData = trafficChartService.getData();
  }

  ngAfterViewInit() {
    //this._loadDoughnutCharts();
  }

   goToPeopleListView (provinceData: any ) {
     //console.log(provinceData);
          this._CommonDataService.filterDataBy = 'province';
          this._CommonDataService.filterData = provinceData;
          this._router.navigate(['/pages/peoples/manage-people']);
  }

  private _loadDoughnutCharts() {
    const el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true,
    });
  }
}
