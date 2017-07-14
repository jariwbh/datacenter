import { forEach } from '@angular/router/src/utils/collection';
import { DashboardService } from './../../../core/services/dashboard/dashboard.service';

import { Router } from '@angular/router';
import { layoutPaths } from './../../../theme/theme.constants';
import { BaThemeConfigProvider } from './../../../theme/theme.configProvider';
import { Component } from '@angular/core';

import { UsersMapService } from './usersMap.service';
import { CommonDataService } from './../../../core/services/common/common-data.service';

@Component({
  selector: 'users-map',
  templateUrl: './usersMap.html',
  styleUrls: ['./usersMap.scss'],
})
export class UsersMap {
  provinceCountList: any = [];

  mapData: any;

  constructor(private _usersMapService: UsersMapService,
    private _baConfig: BaThemeConfigProvider,
    private _router: Router,
    private _CommonDataService: CommonDataService,
    private _DashboardService: DashboardService,
  ) {

    let layoutColors = this._baConfig.get().colors;

    this.mapData = {
      type: 'map',
      theme: 'blur',
      dataProvider: {
        map: 'iraqLow',
        //getAreasFromMap: true,
        areas: [
          { title: 'البصرة', id: 'IQ-BA', color: '#66ffb3', customData: '0', groupId: '1', custtitle: 'البصرة' },
          { title: 'القادسية (الديوانية)', id: 'IQ-QA', color: '#66ff8c', customData: '0', groupId: '2', custtitle: 'القادسية (الديوانية)' },
          { title: 'المثنى', id: 'IQ-MU', color: '#66ffff', customData: '0', groupId: '3', custtitle: 'المثنى' },
          { title: 'النجف', id: 'IQ-NA', color: '#66b3ff', customData: '0', groupId: '4', custtitle: 'النجف' },
          { title: 'بابل', id: 'IQ-BB', color: '#0066cc', customData: '0', groupId: '5', custtitle: 'بابل' },
          { title: 'بغداد', id: 'IQ-BG', color: '#0bb238', customData: '0', groupId: '6', custtitle: 'بغداد' },
          { title: 'ديالى', id: 'IQ-DI', color: '#ffb84d', customData: '0', groupId: '7', custtitle: 'ديالى' },
          { title: 'ذي قار (الناصرية)', id: 'IQ-DQ', color: '#ffdaa1', customData: '0', groupId: '8', custtitle: 'ذي قار (الناصرية)' },
          { title: 'صلاح الدين', id: 'IQ-SD', color: '#ffd736', customData: '0', groupId: '9', custtitle: 'صلاح الدين' },
          { title: 'كربلاء', id: 'IQ-KA', color: '#5eccc0', customData: '0', groupId: '10', custtitle: 'كربلاء' },
          { title: 'كركوك', id: 'IQ-KI', color: '#ffff77', customData: '0', groupId: '11', custtitle: 'كركوك' },
          { title: 'ميسان', id: 'IQ-MA', color: '#997463', customData: '0', groupId: '12', custtitle: 'ميسان' },
          { title: 'نينوى (الموصل)', id: 'IQ-NI', color: '#55cc20', customData: '0', groupId: '13', custtitle: 'نينوى (الموصل)' },
          { title: 'حكم', id: 'IQ-WA', color: '#cc5520', customData: '0', groupId: '14', custtitle: 'حكم' },
          { title: 'الانبار', id: 'IQ-AN', color: '#ccffcc', customData: '0', groupId: '15', custtitle: 'الانبار' },
          { title: 'اربيل', id: 'IQ-AR', color: '#ff9900', customData: '0', groupId: '16', custtitle: 'اربيل' },
          { title: 'دهوك', id: 'IQ-DA', color: '#ffcc00', customData: '0', groupId: '17', custtitle: 'دهوك' },
          { title: 'السليمانية', id: 'IQ-SU', color: '#cccc00', customData: '0', groupId: '18', custtitle: 'السليمانية' },
        ],
      },
      areasSettings: {
        autoZoom: false,
        //selectedColor: '#CC0000',
        selectable: true,
        rollOverColor: '#CC0000',
        balloonText: '[[title]]: [[customData]] users',
      },
      //smallMap: {},
      listeners: [{
        event: 'clickMapObject',
        method: function (event) {
          //console.log(event.mapObject.custtitle);
          _CommonDataService.filterDataBy = 'province';
          _CommonDataService.filterData = event.mapObject.custtitle;
          _router.navigate(['/pages/peoples/manage-people']);
        },
      }],
    };

    //this.mapData = this._usersMapService.getData();
    //  this.mapData = {
    //   type: 'map',
    //   theme: 'blur',

    //   zoomControl: { zoomControlEnabled: false, panControlEnabled: false },

    //   dataProvider: {
    //     // map: 'worldLow',
    //     map: 'iraqLow',

    //     // zoomLevel: 3.5,
    //     // zoomLongitude: 10,
    //     // zoomLatitude: 52,

    //     // zoomLevel: 7.0,
    //     // zoomLongitude: 25,
    //     // zoomLatitude: 30,

    //     //  zoomLongitude: 24.0174,
    //     // zoomLatitude: -1.1076,
    //     areas: [
    //       // { title: 'Austria', id: 'AT', color: layoutColors.primary, customData: '1 244', groupId: '1'},
    //       // { title: 'Ireland', id: 'IE', color: layoutColors.primary, customData: '1 342', groupId: '1'},

    //       // { title: 'Hungary', id: 'HU', color: layoutColors.successLight, customData: '854', groupId: '2'},
    //       // { title: 'Cyprus', id: 'CY', color: layoutColors.successLight, customData: '754', groupId: '2'},
    //       // { title: 'Malta', id: 'MT', color: layoutColors.successLight, customData: '867', groupId: '2'},
    //       // { title: 'Poland', id: 'PL', color: layoutColors.successLight, customData: '759', groupId: '2'},
    //       // { title: 'Romania', id: 'RO', color: layoutColors.success, customData: '302', groupId: '3'},
    //       // { title: 'Bulgaria', id: 'BG', color: layoutColors.success, customData: '102', groupId: '3'},
    //       // { title: 'Slovenia', id: 'SI', color: layoutColors.danger, customData: '23', groupId: '4'},
    //       // { title: 'Croatia', id: 'HR', color: layoutColors.danger, customData: '96', groupId: '4'}
    //       //  { title: 'Basrah', id: 'ES', color: layoutColors.primary, customData: '80', groupId: '1' },
    //       //  { title: 'Karbala', id: 'GB', color: layoutColors.successLight, customData: '100', groupId: '2' },
    //       // { title: 'Mesan', id: 'SE', color: layoutColors.danger, customData: '20', groupId: '4' },
    //       // { title: 'Iraq', id: 'IQ', color: layoutColors.success, customData: '100', groupId: '3' },

    //       { title: 'Al-Basrah', id: 'IQ-BA', color: '#66ffb3', customData: '965', groupId: '1' },
    //       { title: 'Al-Qadisiyah', id: 'IQ-QA', color: '#66ff8c', customData: '685', groupId: '2' },
    //       { title: 'Al-Muthannia', id: 'IQ-MU', color: '#66ffff', customData: '854', groupId: '3' },
    //       { title: 'An-Najaf', id: 'IQ-NA', color: '#66b3ff', customData: '754', groupId: '4' },
    //       { title: 'Babylon', id: 'IQ-BB', color: '#0066cc', customData: '867', groupId: '5' },
    //       { title: 'Baghdad', id: 'IQ-BG', color: '#0bb238', customData: '759', groupId: '6' },
    //       { title: 'Diyala', id: 'IQ-DI', color: '#ffb84d', customData: '302', groupId: '7' },
    //       { title: 'Dhi-Qar', id: 'IQ-DQ', color: '#ffdaa1', customData: '102', groupId: '8' },
    //       { title: 'Sala ad-Din', id: 'IQ-SD', color: '#ffd736', customData: '23', groupId: '9' },
    //       { title: 'Karbala', id: 'IQ-KA', color: '#5eccc0', customData: '96', groupId: '10' },
    //       { title: 'Kirkuk', id: 'IQ-KI', color: '#ffff77', customData: '80', groupId: '11' },
    //       { title: 'Maysan', id: 'IQ-MA', color: '#997463', customData: '100', groupId: '12' },
    //       { title: 'Ninawa', id: 'IQ-NI', color: '#55cc20', customData: '20', groupId: '13' },
    //       { title: 'Wasit', id: 'IQ-WA', color: '#cc5520', customData: '100', groupId: '14' },
    //     ],
    //   },
    //   areasSettings: {
    //     autoZoom: false,
    //     rollOverOutlineColor: layoutColors.border,
    //     // rollOverColor: layoutColors.primaryDark,
    //     rollOverColor: '#ff4441',
    //     alpha: 0.8,
    //     unlistedAreasAlpha: 0.2,
    //     //unlistedAreasAlpha: 0,
    //     unlistedAreasColor: layoutColors.defaultText,
    //     balloonText: '[[title]]: [[customData]] users',
    //   },
    // legend: {
    //   width: '100%',
    //   marginRight: 27,
    //   marginLeft: 27,
    //   equalWidths: false,
    //   backgroundAlpha: 0.3,
    //   backgroundColor: layoutColors.border,
    //   borderColor: layoutColors.border,
    //   borderAlpha: 1,
    //   top: 362,
    //   left: 0,
    //   horizontalGap: 10,
    //   data: [
    //     {
    //       title: 'over 1 000 users',
    //       color: layoutColors.primary,
    //     },
    //     {
    //       title: '500 - 1 000 users',
    //       color: layoutColors.successLight,
    //     },
    //     {
    //       title: '100 - 500 users',
    //       color: layoutColors.success,
    //     },
    //     {
    //       title: '0 - 100 users',
    //       color: layoutColors.danger,
    //     },
    //   ],
    // },
    // export: {
    //   enabled: true,
    // },
    //   creditsPosition: 'bottom-right',
    //   pathToImages: layoutPaths.images.amChart,
    // };

    this.getAllProvinceData();
  }

  getAllProvinceData() {
    this._DashboardService.GetCountForProvince().subscribe(data1 => {
      if (data1 !== null) {
        this.provinceCountList = data1;
        if (this.provinceCountList !== []) {
          this.mapData.dataProvider.areas.forEach(ele => {
            this.provinceCountList.forEach(ele1 => {
              if (ele.custtitle === ele1._id) {
                ele.customData = ele1.count;
              }
            });

          });
        }
      }
    });

  }

}

