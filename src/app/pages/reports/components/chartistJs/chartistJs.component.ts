import { FieldsModel } from './../../../../core/models/dynamic-fields/fields.model';

import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ChartistJsService } from './chartistJs.service';
import { ReportService } from './../../../../core/services/report/report.service';
import { Message } from 'primeng/primeng';
import { SettingsService } from './../../../../core/services/settings/settings.service';
import { FieldsService } from './../../../../core/services/dynamic-fields/fields.service';

@Component({
  selector: 'nga-chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
})

export class ChartistJsComponent {
  comparePointHistoryDataB: any;
  comparePointHistoryDataA: any;
  districtCountSettingsList: any;
  compareUserHistoryDataB: any;
  compareUserHistoryDataA: any;
  provinceCountSettingsList: any;
  selectUserHistoryData: any;
  selectType: string = '';
  compareTwo: string = '';
  firstProvince: string = '';
  secondProvince: string = '';
  firstDistrict: string = '';
  secondDistrict: string = '';
  selectProvince: string = '';
  selectDistrict: string = '';
  xAxisField: string = '';
  xAxisFieldValue: string = '';
  fieldDyCountReport: any;
  fieldDyBestReport: any = {};
  fieldDyCompareReport: any = {};
  fieldValueDyCountReport: any = {};
  fieldValueDyBestReport: any = {};
  fieldValueDyCompareReport: any = {};
  
  showGenCompareReport = false;
  showGenSelectReport = false;
  showGenDynamicReport = false;
  showGenDyCountReport = false;
  showGenDyBestReport = false;
  showGenDyCompareReport = false;

  dataComparePointHistory: any = {};
  dataCompareUserHistory: any = {};
  dataCompareResultHistory: any = {};

  dataSelectPointHistory: any = {};
  dataSelectUserHistory: any = {};
  dataSelectResultHistory: any = {};

  dataDyCountUserHistory: any = {};
  dataDyBestUserHistory: any = {};
  dataDyCompareUserHistory: any = {};

  msgs: Message[] = [];
  data: any;
  // allView: boolean = true;
  compareView: boolean = true;
  selectedView: boolean = false;
  dynamicView: boolean = false;

  countDyView: boolean = true;
  bestDyView: boolean = false;
  compareDyView: boolean = false;

  provinceList: any[] = [];
  districtList: any[] = [];
  areaList: any[] = [];

  districtListforDD: any[] = [];
  areaListforDD: any[] = [];
  
  fieldList: any[] = [];

  defaultLabelArr: string[] = [];
  defaultseriesArr: number[] = [];
  selectMonthYearArray: any[] = [];
  chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(231,233,237)',
  };

  constructor(private _chartistJsService: ChartistJsService,
    private _ReportService: ReportService,
    private _Settings: SettingsService,
    private _fieldsService: FieldsService,
  ) {
    this.defaultLabelArr = _ReportService.defaultLabelArr;
    this.defaultseriesArr = _ReportService.defaultseriesArr;
    this.selectMonthYearArray = _ReportService.selectMonthYearArray;
    this.dataComparePointHistory = {
       labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
     this.dataCompareUserHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
     this.dataCompareResultHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataSelectPointHistory = {
       labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataSelectUserHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataSelectResultHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataDyCountUserHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataDyBestUserHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataDyCompareUserHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    
  }

  ngOnInit() {
    this.data = this._chartistJsService.getAll();
    this.getAllProvince();
    this.getAllDistrict();
    this.getAllAreas();
    this.getAllFields();
  }

  getAllProvince() {
    this._ReportService.GetAllProvince().subscribe(data => {
      if (data) {
        this.provinceList = data;
      }
    });
  }
  getAllDistrict() {
    this._ReportService.GetAllDistrict().subscribe(data => {
      if (data) {
        this.districtList = data;
      }
    });
  }
  getAllAreas() {
    this._ReportService.GetAllArea().subscribe(data => {
      if (data) {
        this.areaList = data;
      }
    });
  }
  getAllFields() {
    this._fieldsService
          .GetAll('people')
          .subscribe(
          data => {
            if (data) {
               this.fieldList = data;
              //  this.fieldList = this.fieldList.filter(ele => (ele.labelname !== 'province' &&
              //   ele.labelname !== 'district' &&
              //   ele.labelname !== 'area'));
            }
          });
   }
  switchView(view: string) {
   
    this.selectType = '';
    this.compareTwo = '';
    this.firstProvince = '';
    this.secondProvince = '';
    this.firstDistrict = '';
    this.secondDistrict = '';
    this.selectProvince = '';
    this.selectDistrict = '';

    this.showGenCompareReport = false;
    this.showGenSelectReport = false;
    this.showGenDynamicReport = false;
    if (view === 'CompareView') {
      //this.allView = false;
      this.compareView = true;
      this.selectedView = false;
      this.dynamicView = false;
    } else if (view === 'SelectedView') {
      //this.allView = false;
      this.compareView = false;
      this.selectedView = true;
      this.dynamicView = false;
    } else if (view === 'DynamicView') {
      //this.allView = false;
      this.compareView = false;
      this.selectedView = false;
      this.dynamicView = true;
    }
  }

  switchDyView(view: string) {
   
    // this.selectType = '';
    // this.compareTwo = '';
    // this.firstProvince = '';
    // this.secondProvince = '';
    // this.firstDistrict = '';
    // this.secondDistrict = '';
    // this.selectProvince = '';
    // this.selectDistrict = '';

    // this.showGenCompareReport = false;
    // this.showGenSelectReport = false;
    // this.showGenDynamicReport = false;

    this.showGenDyCountReport = false;
    this.showGenDyBestReport = false;
    this.showGenDyCompareReport = false;

    this.xAxisField = '';
    this.xAxisFieldValue = '';

    if (view === 'CountDyView') {
      
      this.countDyView = true;
      this.bestDyView = false;
      this.compareDyView = false;
    } else if (view === 'BestDyView') {
      this.countDyView = false;
      this.bestDyView = true;
      this.compareDyView = false;
    } else if (view === 'CompareDyView') {
      this.countDyView = false;
      this.bestDyView = false;
      this.compareDyView = true;
    }
  }

  onChangeFieldToCompare(fieldsToCompare) {
    this.showGenCompareReport = false;
    this.firstProvince = '';
    this.secondProvince = '';
    this.firstDistrict = '';
    this.secondDistrict = '';
    if (fieldsToCompare === 'Province') {
      this.compareTwo = 'Province';
    } else if (fieldsToCompare === 'District') {
      this.compareTwo = 'District';
    }

  }
  onChangeFieldforSelectReport(selectedField) {
    this.showGenSelectReport = false;
    this.selectProvince = '';
    this.selectDistrict = '';
    if (selectedField === 'Province') {
      this.selectType = 'Province';
    } else if (selectedField === 'District') {
      this.selectType = 'District';
    }
  }

  onChangeFieldforDynamicReport(selectedField) {
     this.showGenDynamicReport = false;
     this.xAxisField = selectedField;
  }
  onChangeFieldValueforDynamicReport(selectedField) {
     this.showGenDynamicReport = false;
     this.xAxisFieldValue = selectedField;
  }
  onChangeFieldforDyCountReport(selectedField) {
      this.showGenDyCountReport = false;
      this.fieldDyCountReport = JSON.parse(selectedField);
      // console.log(JSON.parse(selectedField));
      this.xAxisField = this.fieldDyCountReport.displayname;
  }
  onChangeFieldforDyBestReport(selectedField) {
      this.showGenDyBestReport = false;
      this.fieldDyBestReport = selectedField;
       // console.log(JSON.parse(selectedField));
      this.xAxisField = this.fieldDyCountReport.displayname;
  }
  onChangeFieldforDyCompareReport(selectedField) {
      this.showGenDyCompareReport = false;
      this.fieldDyCompareReport = selectedField;
  }
  onChangeFieldValueforDyCountReport(selectedField) {
      this.showGenDyCountReport = false;
      this.fieldValueDyCountReport = selectedField;
      // console.log(JSON.parse(selectedField));
      this.xAxisFieldValue = selectedField;
  }
  // onChangeFieldValueforDyBestReport(selectedField) {
  //     this.showGenDyBestReport = false;
  //     this.fieldValueDyBestReport = selectedField;
  //     // console.log(JSON.parse(selectedField));
  //     this.xAxisFieldValue = selectedField;
  // }
  onChangeFieldValueforDyCompareReport(selectedField) {
      this.showGenDyCompareReport = false;
      this.fieldValueDyCompareReport = selectedField;
      // console.log(JSON.parse(selectedField));
      this.xAxisFieldValue = selectedField;
  }

  onChangeFirstProvince(firstProvince) {
    this.showGenCompareReport = false;
    this.firstProvince = firstProvince;
    // this.resetAllCharts();
  }
  onChangeSecondProvince(secondProvince) {
    this.showGenCompareReport = false;
    this.secondProvince = secondProvince;
   // this.resetAllCharts();
  }
  onChangeFirstDistrict(firstDistrict) {
    this.showGenCompareReport = false;
    this.firstDistrict = firstDistrict;
  }
  onChangeSecondDistrict(secondDistrict) {
    this.showGenCompareReport = false;
    this.secondDistrict = secondDistrict;
  }

  onChangeSelectProvince(selectProvince) {
    this.showGenSelectReport = false;
    this.selectProvince = selectProvince;
  }
  onChangeSelectDistrict(selectDistrict) {
    this.showGenSelectReport = false;
    this.selectDistrict = selectDistrict;
  }

   onChangeDyProvince(province) {
    if (province !== '') {
      this.districtListforDD = this.districtList.filter(element => element.province === province);
      this.areaListforDD = this.areaList.filter(element => element.province === province);
    } else {
      this.districtListforDD = [];
      this.areaListforDD = [];
    }
  }

  genrateReportForDyCount() {
    this.dataDyCountUserHistory.series = [
             [15, 24, 43, 57, 65, 70, 77, 82, 98, 100, 125, 200],
        //     [13, 22, 49, 22, 4, 6, 24, 46, 57, 148, 22, 4],
           ];
   this.showGenDyCountReport = true;
  }
  genrateReportForDyBest() {
     this.dataDyBestUserHistory.labels = ['Basra', 'Muthanna', 'Najaf', 'Babylon', 'Baghdad'];
     this.dataDyBestUserHistory.series = [
               [82, 98, 100, 125, 200],
          //   [15, 24, 43, 37, 65, 80, 77, 82, 98, 100, 125, 200],
        //     [13, 22, 49, 22, 4, 6, 24, 46, 57, 148, 22, 4],
           ];
   this.showGenDyBestReport = true;
  }
  genrateReportForDyCompare() {
     this.dataDyCompareUserHistory.series = [
             [15, 54, 43, 107, 65, 127, 87, 62, 98, 100, 125, 200],
             [13, 22, 52, 62, 104, 76, 54, 96, 107, 148, 180, 190],
           ];
   this.showGenDyCompareReport = true;
  }

  genrateReportForCompare() {
    if (this.compareTwo === 'Province') {
      if (this.firstProvince !== '' && this.secondProvince !== '') {

         let labelsArr: string[] = [];
        let seriesArrA: number[] = [];
        let seriesArrB: number[] = [];
        let seriesArrC: number[] = [];
        let seriesArrD: number[] = [];
        let seriesArrAP: number[] = [];
        let seriesArrBP: number[] = [];
        let settingCountA: number = 0;
        let settingCountB: number = 0;

         this._Settings.GetAllSetting().subscribe(data1 => {
              if (data1 !== null) {
                if (data1.noOfUserInProvince !== null) {
                  this.provinceCountSettingsList = data1.noOfUserInProvince;

                  this.provinceCountSettingsList.forEach(ele3 => {
                            if (ele3.province === this.firstProvince) {
                                  settingCountA = ele3.count;
                            }
                            if (ele3.province === this.secondProvince) {
                                  settingCountB = ele3.count;
                            }
                  });
                }
              }
            });

        this._ReportService.GetUserCountsHistoryProvince(this.firstProvince).subscribe(data => {
          if (data !== null) {
            this.compareUserHistoryDataA = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              labelsArr.push(ele.month);
              let countUser = 0;
              this.compareUserHistoryDataA.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countUser = ele1.count;
                  }
                }
              });
              seriesArrA.push(countUser);
              seriesArrC.push(settingCountA);
            });
           // console.log(labelsArr);
           // console.log(seriesArrA);
           // console.log(seriesArrC);
          }

        });

        this._ReportService.GetUserCountsHistoryProvince(this.secondProvince).subscribe(data => {
          if (data !== null) {
            this.compareUserHistoryDataB = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              //labelsArr.push(ele.month);
              let countUser = 0;
              this.compareUserHistoryDataB.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countUser = ele1.count;
                  }
                }
              });
              seriesArrB.push(countUser);
              seriesArrD.push(settingCountB);
            });
           // console.log(labelsArr);
           // console.log(seriesArrB);
           // console.log(seriesArrD);
          }

        });

         this._ReportService.GetUserPointsHistoryProvince(this.firstProvince).subscribe(data => {
          if (data !== null) {
            this.comparePointHistoryDataA = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              // labelsArr.push(ele.month);
              let countPoint = 0;
              this.comparePointHistoryDataA.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countPoint = ele1.count;
                  }
                }
              });
              seriesArrAP.push(countPoint);
            });
           // console.log(labelsArr);
           // console.log(seriesArrAP);
          }

        });
         this._ReportService.GetUserPointsHistoryProvince(this.secondProvince).subscribe(data => {
          if (data !== null) {
            this.comparePointHistoryDataB = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              // labelsArr.push(ele.month);
              let countPoint = 0;
              this.comparePointHistoryDataB.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countPoint = ele1.count;
                  }
                }
              });
              seriesArrBP.push(countPoint);
             
            });
           // console.log(labelsArr);
           // console.log(seriesArrBP);
          }

        });

        // this.dataComparePointHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
        //     [13, 22, 49, 22, 4, 6, 24, 46, 57, 148, 22, 4],
        //   ],
        // };

        // this.dataComparePointHistory.labels = [];
        //this.dataComparePointHistory.series = [];
        // this.dataComparePointHistory.labels = labelsArr;
         this.dataComparePointHistory.series = [seriesArrAP];
        // this.dataComparePointHistory.series[0] = seriesArrA;
        this.dataComparePointHistory.series.push(seriesArrBP);

        

        // this.dataCompareUserHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     // [20, 30, 60, 70, 80, 90, 100, 120, 125, 130, 133, 140],
        //     // [13, 25, 30, 50, 64, 70, 80, 90, 95, 105, 120, 135],
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //     [4, 25, 35, 45, 55, 88, 105, 120, 130, 135, 140, 155],
        //   ],
        // };

        //  this.dataCompareUserHistory.labels = [];
        // this.dataCompareUserHistory.series = [];
        //  this.dataCompareUserHistory.labels = labelsArr;
         this.dataCompareUserHistory.series = [seriesArrA];
        // this.dataCompareUserHistory.series[0] = seriesArrA;
        this.dataCompareUserHistory.series.push(seriesArrB);

        // this.dataCompareResultHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //     [4, 25, 35, 45, 55, 88, 105, 120, 130, 135, 140, 155],
        //     [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
        //     [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
        //   ],
        // };

        // this.dataCompareResultHistory.labels = [];
        //this.dataCompareResultHistory.series = [];
        // this.dataCompareResultHistory.labels = labelsArr;
         this.dataCompareResultHistory.series = [seriesArrA];
        // this.dataCompareResultHistory.series[0] = seriesArrA;
        this.dataCompareResultHistory.series.push(seriesArrB);
        this.dataCompareResultHistory.series.push(seriesArrC);
        this.dataCompareResultHistory.series.push(seriesArrD);

        // setTimeout(() => {
        //     // if (document.getElementById('row_' + this._topAdminlist[0]['custom_id'])) {
        //     //   document.getElementById('row_' + this._topAdminlist[0]['custom_id']).click();
        //     // }
        //      let mychart = $('#LineChart .ct-chart');
        //      mychart.update(); 
        //      //mychart.get(0).__chartist__.update(this.dataCompareResultHistory);  
        //   }, 2000);
        
        setTimeout(() => {
          this.showGenCompareReport = true;
          }, 500);
        
      } else { 
        this.showGenCompareReport = false;
        //alert('please select Province to Compare');
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'please select Province to Compare' });
      }
       
    } else if (this.compareTwo === 'District') {
      if (this.firstDistrict !== '' && this.secondDistrict !== '') {

          let labelsArr: string[] = [];
        let seriesArrA: number[] = [];
        let seriesArrB: number[] = [];
        let seriesArrC: number[] = [];
        let seriesArrD: number[] = [];
        let seriesArrAP: number[] = [];
        let seriesArrBP: number[] = [];
        let settingCountA: number = 0;
        let settingCountB: number = 0;

         this._Settings.GetAllSetting().subscribe(data1 => {
              if (data1 !== null) {
                if (data1.noOfUserInProvince !== null) {
                  this.districtCountSettingsList = data1.noOfUserInDistrict;

                  this.districtCountSettingsList.forEach(ele3 => {
                            if (ele3.district === this.firstDistrict) {
                                  settingCountA = ele3.count;
                            }
                            if (ele3.district === this.secondDistrict) {
                                  settingCountB = ele3.count;
                            }
                  });
                }
              }
            });

        this._ReportService.GetUserCountsHistoryDistrict(this.firstDistrict).subscribe(data => {
          if (data !== null) {
            this.compareUserHistoryDataA = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              labelsArr.push(ele.month);
              let countUser = 0;
              this.compareUserHistoryDataA.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countUser = ele1.count;
                  }
                }
              });
              seriesArrA.push(countUser);
              seriesArrC.push(settingCountA);
            });
           // console.log(labelsArr);
           // console.log(seriesArrA);
          }

        });

        this._ReportService.GetUserCountsHistoryDistrict(this.secondDistrict).subscribe(data => {
          if (data !== null) {
            this.compareUserHistoryDataB = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              //labelsArr.push(ele.month);
              let countUser = 0;
              this.compareUserHistoryDataB.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countUser = ele1.count;
                  }
                }
              });
              seriesArrB.push(countUser);
              seriesArrD.push(settingCountB);
            });
           // console.log(labelsArr);
           // console.log(seriesArrB);
          }

        });

         this._ReportService.GetUserPointsHistoryDistrict(this.firstDistrict).subscribe(data => {
          if (data !== null) {
            this.comparePointHistoryDataA = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              // labelsArr.push(ele.month);
              let countPoint = 0;
              this.comparePointHistoryDataA.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countPoint = ele1.count;
                  }
                }
              });
              seriesArrAP.push(countPoint);
            });
           // console.log(labelsArr);
           // console.log(seriesArrAP);
          }

        });
         this._ReportService.GetUserPointsHistoryDistrict(this.secondDistrict).subscribe(data => {
          if (data !== null) {
            this.comparePointHistoryDataB = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              // labelsArr.push(ele.month);
              let countPoint = 0;
              this.comparePointHistoryDataB.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countPoint = ele1.count;
                  }
                }
              });
              seriesArrBP.push(countPoint);
             
            });
           // console.log(labelsArr);
           // console.log(seriesArrBP);
          }

        });

        
        // this.dataComparePointHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
        //     [13, 22, 49, 22, 4, 6, 24, 46, 57, 148, 22, 4],
        //   ],
        // };

        // this.dataComparePointHistory.labels = [];
        this.dataComparePointHistory.series = [];
        // this.dataComparePointHistory.labels = labelsArr;
         this.dataComparePointHistory.series = [seriesArrAP];
        // this.dataComparePointHistory.series[0] = seriesArrA;
        this.dataComparePointHistory.series.push(seriesArrBP);

        // this.dataCompareUserHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     //  [20, 30, 60, 70, 80, 90, 100, 120, 125, 130, 133, 140],
        //     //  [13, 25, 30, 50, 64, 70, 80, 90, 95, 105, 120, 135],
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //     [4, 25, 35, 45, 55, 88, 105, 120, 130, 135, 140, 155],
        //   ],
        // };
        // this.dataCompareUserHistory.labels = [];
        this.dataCompareUserHistory.series = [];
        // this.dataCompareUserHistory.labels = labelsArr;
         this.dataCompareUserHistory.series = [seriesArrA];
        // this.dataCompareUserHistory.series[0] = seriesArrA;
        this.dataCompareUserHistory.series.push(seriesArrB);
        // this.dataCompareResultHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //     [4, 25, 35, 45, 55, 88, 105, 120, 130, 135, 140, 155],
        //     [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
        //     [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
        //   ],
        // };
          // this.dataCompareResultHistory.labels = [];
        this.dataCompareResultHistory.series = [];
        // this.dataCompareResultHistory.labels = labelsArr;
         this.dataCompareResultHistory.series = [seriesArrA];
         // this.dataCompareResultHistory.series[0] = seriesArrA;
        this.dataCompareResultHistory.series.push(seriesArrB);
        this.dataCompareResultHistory.series.push(seriesArrC);
        this.dataCompareResultHistory.series.push(seriesArrD);

        
          setTimeout(() => {
           this.showGenCompareReport = true;
          }, 500);
      } else {
        this.showGenCompareReport = false;
        //alert('please select District to Compare');
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'please select District to Compare' });
      }
    }

  }
  genrateReportForSelect() {
    //this.showGenSelectReport = true;


    if (this.selectType === 'Province') {
      if (this.selectProvince !== '') {
        let labelsArr: string[] = [];
        let seriesArrA: number[] = [];
        let seriesArrB: number[] = [];
        let seriesArrAP: number[] = [];
        let settingCount: number = 0;

         this._Settings.GetAllSetting().subscribe(data1 => {
              if (data1 !== null) {
                if (data1.noOfUserInProvince !== null) {
                  this.provinceCountSettingsList = data1.noOfUserInProvince;

                  this.provinceCountSettingsList.forEach(ele3 => {
                            if (ele3.province === this.selectProvince) {
                                  settingCount = ele3.count;
                            }
                  });
                }
              }
            });

        this._ReportService.GetUserCountsHistoryProvince(this.selectProvince).subscribe(data => {
          if (data !== null) {
            this.selectUserHistoryData = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              labelsArr.push(ele.month);
              let countUser = 0;
              this.selectUserHistoryData.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countUser = ele1.count;
                  }
                }
              });
              seriesArrA.push(countUser);
              seriesArrB.push(settingCount);
            });
            
           // console.log(labelsArr);
           // console.log(seriesArrA);

          }

        });

         this._ReportService.GetUserPointsHistoryProvince(this.selectProvince).subscribe(data => {
          if (data !== null) {
            this.comparePointHistoryDataA = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              // labelsArr.push(ele.month);
              let countPoint = 0;
              this.comparePointHistoryDataA.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countPoint = ele1.count;
                  }
                }
              });
              seriesArrAP.push(countPoint);
            });
           // console.log(labelsArr);
           // console.log(seriesArrAP);
          }

        });

        
        // this.dataSelectPointHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
        //   ],
        // };

         // this.dataSelectPointHistory.labels = [];
        this.dataSelectPointHistory.series = [];
        // this.dataSelectPointHistory.labels = labelsArr;
         this.dataSelectPointHistory.series = [seriesArrAP];
        // this.dataSelectPointHistory.series[0] = seriesArrA;

        // this.dataSelectUserHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     // [20, 30, 60, 70, 80, 90, 100, 120, 125, 130, 133, 140],
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //   ],
        // };

        // this.dataSelectUserHistory.labels = [];
        this.dataSelectUserHistory.series = [];
        // this.dataSelectUserHistory.labels = labelsArr;
        this.dataSelectUserHistory.series = [seriesArrA];

        // this.dataSelectResultHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //     [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
        //   ],
        // };

        // this.dataSelectResultHistory.labels = [];
        this.dataSelectResultHistory.series = [];
        // this.dataSelectResultHistory.labels = labelsArr;
        this.dataSelectResultHistory.series = [seriesArrA];
        this.dataSelectResultHistory.series.push(seriesArrB);

        
        setTimeout(() => {
           this.showGenSelectReport = true;
          }, 500);

      } else {
        this.showGenSelectReport = false;
        //alert('please select Province to Compare');
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'please select Province' });
      }

    } else if (this.selectType === 'District') {
      if (this.selectDistrict !== '') {
       
        let labelsArr: string[] = [];
        let seriesArrA: number[] = [];
        let seriesArrB: number[] = [];
        let seriesArrAP: number[] = [];
        let settingCount: number = 0;

         this._Settings.GetAllSetting().subscribe(data1 => {
              if (data1 !== null) {
                if (data1.noOfUserInProvince !== null) {
                  this.districtCountSettingsList = data1.noOfUserInDistrict;

                  this.districtCountSettingsList.forEach(ele3 => {
                            if (ele3.district === this.selectDistrict) {
                                  settingCount = ele3.count;
                            }
                  });
                }
              }
            });

        this._ReportService.GetUserCountsHistoryDistrict(this.selectDistrict).subscribe(data => {
          if (data !== null) {
            this.selectUserHistoryData = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              labelsArr.push(ele.month);
              let countUser = 0;
              this.selectUserHistoryData.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countUser = ele1.count;
                  }
                }
              });
              seriesArrA.push(countUser);
              seriesArrB.push(settingCount);
            });
            
           // console.log(labelsArr);
           // console.log(seriesArrA);

          }

        });

         this._ReportService.GetUserPointsHistoryDistrict(this.selectDistrict).subscribe(data => {
          if (data !== null) {
            this.comparePointHistoryDataA = data;
            // let abc: any[] = this._ReportService.loadLastMonthsArray(2017, 4);
            // console.log(abc);
            this.selectMonthYearArray.forEach(ele => {
              // labelsArr.push(ele.month);
              let countPoint = 0;
              this.comparePointHistoryDataA.forEach(ele1 => {
                if (ele.year === ele1._id.year) {
                  if (ele.monthNo === ele1._id.month) {
                    countPoint = ele1.count;
                  }
                }
              });
              seriesArrAP.push(countPoint);
            });
           // console.log(labelsArr);
           // console.log(seriesArrAP);
          }

        });

        // this.dataSelectPointHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
        //   ],
        // };

         // this.dataSelectPointHistory.labels = [];
        this.dataSelectPointHistory.series = [];
        // this.dataSelectPointHistory.labels = labelsArr;
         this.dataSelectPointHistory.series = [seriesArrAP];
        // this.dataSelectPointHistory.series[0] = seriesArrA;

        // this.dataSelectUserHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     // [20, 30, 60, 70, 80, 90, 100, 120, 125, 130, 133, 140],
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //   ],
        // };

         // this.dataSelectUserHistory.labels = [];
        this.dataSelectUserHistory.series = [];
        // this.dataSelectUserHistory.labels = labelsArr;
        this.dataSelectUserHistory.series = [seriesArrA];

        // this.dataSelectResultHistory = {
        //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //   series: [
        //     [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
        //     [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
        //   ],
        // };

         // this.dataSelectResultHistory.labels = [];
        this.dataSelectResultHistory.series = [];
        // this.dataSelectResultHistory.labels = labelsArr;
        this.dataSelectResultHistory.series = [seriesArrA];
        this.dataSelectResultHistory.series.push(seriesArrB);

        
         setTimeout(() => {
            this.showGenSelectReport = true;
          }, 500);
      } else {
        this.showGenSelectReport = false;
        //alert('please select District to Compare');
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'please select District' });
      }
    }

  }

  resetAllCharts() {
     this.dataComparePointHistory = {
       labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
     this.dataCompareUserHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
     this.dataCompareResultHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataSelectPointHistory = {
       labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataSelectUserHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
    this.dataSelectResultHistory = {
      labels: this.defaultLabelArr,
      series: [this.defaultseriesArr],
    };
  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
