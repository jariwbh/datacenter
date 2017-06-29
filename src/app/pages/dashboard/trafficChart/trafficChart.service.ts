import { forEach } from '@angular/router/src/utils/collection';

import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import { DashboardService } from './../../../core/services/dashboard/dashboard.service';

@Injectable()
export class TrafficChartService {
   chartData: any[];
  // proChartData: any[];
  provinceData: any[];
  proprovinceData: object[] = [];
  constructor(private _baConfig: BaThemeConfigProvider, private _DashboardService: DashboardService) {

    // this.getAllChartData();
    this.getAllProvinceData();
  }
 
  // getAllChartData() {
  //   this._DashboardService.GetAllTrafficChartData().subscribe(data => {

  //     if (data !== null) {
  //       this.chartData = data;
  //     }
  //   });

  // }

  getAllProvinceData() {
    this._DashboardService.GetAllProvinceInfo().subscribe(data => {

      if (data !== null) {
        this.provinceData = data;
        this.provinceData.forEach( ele => {
          console.log(ele);
             this.proprovinceData.push({ value: 350,
                color: ele.color, 
               highlight: colorHelper.shade(ele.color, 15),
                label: ele.name,
                percentage: 30,
                order: ele.order,
              });
        });
        console.log(this.proprovinceData);
      }
    });
    
  }

  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return this.proprovinceData;
    // return [
    //   {
    //     value: 350,
    //     color: dashboardColors.white,
    //     highlight: colorHelper.shade(dashboardColors.white, 15),
    //     label: 'Basrah',
    //     percentage: 20,
    //     order: 1,
    //   }, {
    //     value: 100,
    //     color: dashboardColors.gossip,
    //     highlight: colorHelper.shade(dashboardColors.gossip, 15),
    //     label: 'Karbala',
    //     percentage: 100,
    //     order: 2,
    //   }, {
    //     value: 350,
    //     color: dashboardColors.silverTree,
    //     highlight: colorHelper.shade(dashboardColors.silverTree, 15),
    //     label: 'Baghdad',
    //     percentage: 100,
    //     order: 3,
    //   }, {
    //     value: 50,
    //     color: dashboardColors.surfieGreen,
    //     highlight: colorHelper.shade(dashboardColors.surfieGreen, 15),
    //     label: 'Mesan',
    //     percentage: 20,
    //     order: 2,
    //   },
    // ];
  }
}
