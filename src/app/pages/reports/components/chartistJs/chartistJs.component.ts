
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ChartistJsService } from './chartistJs.service';
import { ReportService } from './../../../../core/services/report/report.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
})

export class ChartistJsComponent {
  selectType: string = '';
  compareTwo: string = '';
  firstProvince: string = '';
  secondProvince: string = '';
  firstDistrict: string = '';
  secondDistrict: string = '';
  selectProvince: string = '';
  selectDistrict: string = '';

  showGenCompareReport = false;
  showGenSelectReport = false;

  dataComparePointHistory: any = {};
  dataCompareUserHistory: any = {};
  dataCompareResultHistory: any = {};

  dataSelectPointHistory: any = {};
  dataSelectUserHistory: any = {};
  dataSelectResultHistory: any = {};

  msgs: Message[] = [];
  data: any;
  // allView: boolean = true;
  compareView: boolean = true;
  selectedView: boolean = false;
  
  provinceList: any[] = [];
  districtList: any[] = [];
  constructor(private _chartistJsService: ChartistJsService, private _ReportService: ReportService) {
  }

  ngOnInit() {
    this.data = this._chartistJsService.getAll();
    this.getAllProvince();
    this.getAllDistrict();
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
  switchView(view: string) {
    // if (view === 'All') {
    //   //this.allView = true;
    //   this.compareView = true;
    //   this.fieldBasedView = true;
    // } else 
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
    if (view === 'CompareView') {
      //this.allView = false;
      this.compareView = true;
      this.selectedView = false;
    } else if (view === 'SelectedView') {
      //this.allView = false;
      this.compareView = false;
      this.selectedView = true;
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

  onChangeFirstProvince(firstProvince) {
    this.showGenCompareReport = false;
    this.firstProvince = firstProvince;
  }
  onChangeSecondProvince(secondProvince) {
    this.showGenCompareReport = false;
    this.secondProvince = secondProvince;
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

  genrateReportForCompare() {
    if (this.compareTwo === 'Province') {
      if (this.firstProvince !== '' && this.secondProvince !== '') {
        this.showGenCompareReport = true;
        this.dataComparePointHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
            [13, 22, 49, 22, 4, 6, 24, 46, 57, 148, 22, 4],
          ],
        };
        this.dataCompareUserHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [20, 30, 60, 40, 5, 75, 20, 55, 60, 100, 26, 8],
            [13, 45, 20, 50, 4, 40, 80, 20, 45, 148, 90, 4],
          ],
        };
        this.dataCompareResultHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
            [4, 25, 35, 45, 55, 88, 105, 120, 130, 135, 140, 155],
            [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
            [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
          ],
        };

      } else {
        this.showGenCompareReport = false;
        //alert('please select Province to Compare');
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'please select Province to Compare' });
      }

    } else if (this.compareTwo === 'District') {
      if (this.firstDistrict !== '' && this.secondDistrict !== '') {
        this.showGenCompareReport = true;
        this.dataComparePointHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
            [13, 22, 49, 22, 4, 6, 24, 46, 57, 148, 22, 4],
          ],
        };
        this.dataCompareUserHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [20, 30, 60, 40, 5, 75, 20, 55, 60, 100, 26, 8],
            [13, 45, 20, 50, 4, 40, 80, 20, 45, 148, 90, 4],
          ],
        };
         this.dataCompareResultHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
             [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
             [4, 25, 35, 45, 55, 88, 105, 120, 130, 135, 140, 155],
             [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
             [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
          ],
        };

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
        this.showGenSelectReport = true;
        this.dataSelectPointHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
          ],
        };
        this.dataSelectUserHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [20, 30, 60, 40, 5, 75, 20, 55, 60, 100, 26, 8],
          ],
        };
        this.dataSelectResultHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
            [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
          ],
        };

      } else {
        this.showGenSelectReport = false;
        //alert('please select Province to Compare');
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'please select Province' });
      }

    } else if (this.selectType === 'District') {
      if (this.selectDistrict !== '') {
        this.showGenSelectReport = true;
        this.dataSelectPointHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [15, 24, 43, 27, 5, 10, 23, 44, 68, 100, 26, 8],
          ],
        };
        this.dataSelectUserHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [20, 30, 60, 40, 5, 75, 20, 55, 60, 100, 26, 8],
          ],
        };
         this.dataSelectResultHistory = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
             [5, 20, 30, 40, 60, 75, 85, 95, 98, 100, 115, 125],
            [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
          ],
        };

      } else {
        this.showGenSelectReport = false;
        //alert('please select District to Compare');
        this.msgs = [];
        this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'please select District' });
      }
    }

  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
