import { forEach } from '@angular/router/src/utils/collection';

import { Injectable } from '@angular/core';
import { BaThemeConfigProvider, colorHelper } from '../../../theme';
import { SettingsService } from './../../../core/services/settings/settings.service';
import { DashboardService } from './../../../core/services/dashboard/dashboard.service';

@Injectable()
export class TrafficChartService {
  provinceCountList: any = [];
  provinceCountSettingsList: any = [];
  chartData: any[];
  // proChartData: any[];
  provinceData: any[];
  proprovinceData: any[] = [];
  constructor(private _baConfig: BaThemeConfigProvider,
    private _DashboardService: DashboardService,
    private _Settings: SettingsService,
  ) {

    // this.getAllChartData();
    this.getAllProvinceData();
    this.getAllProvincePerData();
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
        this.provinceData.forEach(ele => {
          //console.log(ele);
          this.proprovinceData.push({
            value: 350,
            color: ele.color,
            highlight: colorHelper.shade(ele.color, 15),
            label: ele.name,
            percentage: 0,
            order: ele.order,
            settingPersonCount: 0,
            personCount: 0,
          });
        });
        //console.log(this.proprovinceData);
      }
    });

  }

  getAllProvincePerData() {
    this._Settings.GetAllSetting().subscribe(data => {
      if (data) {
        if (data.noOfUserInProvince !== null) {
          this.provinceCountSettingsList = data.noOfUserInProvince;
          if (this.provinceCountSettingsList !== []) {
            this._DashboardService.GetCountForProvince().subscribe(data1 => {
              if (data1 !== null) {
                //console.log( data1);
                this.provinceCountList = data1;
                if (this.provinceCountList !== []) {
                  this.provinceCountList.forEach(ele => {
                    //console.log( ele);
                    this.proprovinceData.forEach(ele1 => {
                      if (ele._id !== null) {
                        // console.log( ele);
                        // console.log( ele1);
                        if (ele._id === ele1.label) {
                          ele1.personCount = ele.count;
                          let dBy = ele1.settingPersonCount;
                          if (ele1.settingPersonCount === 0) {
                            dBy = 1;
                          }
                          ele1.percentage = Math.floor(ele.count * 100 / dBy);

                          this.provinceCountSettingsList.forEach(ele3 => {
                            if (ele3.province === ele._id) {
                              dBy = ele3.count;
                              //console.log(dBy);
                              //console.log(ele.count);
                              // if (ele1.settingPersonCount === 0) {
                              if (dBy === 0) {
                                dBy = 1;
                              }
                              // ele1.percentage = Math.floor(ele1.personCount * 100 / dBy);
                              ele1.percentage = Math.floor(ele.count * 100 / dBy);
                              //console.log(ele1.percentage);
                            }
                          });


                        }
                      }
                    });
                  });
                }
              }
            });


          }
        }
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
