import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ChartistJsService } from './chartistJs.service';

@Component({
  selector: 'nga-chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
})

export class ChartistJsComponent {
  selectType: string;

  data: any;
  //allView: boolean = true;
  compareView: boolean = true;
  selectedView: boolean = false;
  compareTwo: string;

  constructor(private _chartistJsService: ChartistJsService) {
  }

  ngOnInit() {
    this.data = this._chartistJsService.getAll();
  }

  switchView(view: string) {
    // if (view === 'All') {
    //   //this.allView = true;
    //   this.compareView = true;
    //   this.fieldBasedView = true;
    // } else 
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
    if (fieldsToCompare === 'Province') {
      this.compareTwo = 'Province';
    } else if (fieldsToCompare === 'District') {
      this.compareTwo = 'District';
    }

  }
  onChangeFieldforSelectReport(selectedField) {
    if (selectedField === 'Province') {
      this.selectType = 'Province';
    } else if (selectedField === 'District') {
      this.selectType = 'District';
    }
  }

  onChangeFirstProvince() {

  }
  onChangeSecondProvince() {

  }
  onChangeFirstDistrict() {

  }
  onChangeSecondDistrict() {

  }

  onChangeSelectProvince() {

  }
  onChangeSelectDistrict() {

  }

  genrateReportForCompare() {

  }
  genrateReportForSelect() {

  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
