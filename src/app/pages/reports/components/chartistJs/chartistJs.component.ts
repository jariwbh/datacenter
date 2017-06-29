import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ChartistJsService } from './chartistJs.service';

@Component({
  selector: 'nga-chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
})

export class ChartistJsComponent {

  data: any;
  //allView: boolean = true;
  compareView: boolean = true;
  fieldBasedView: boolean = true;
  compareTwo: string;

  constructor(private _chartistJsService: ChartistJsService) {
  }

  ngOnInit() {
    this.data = this._chartistJsService.getAll();
  }

  switchView(view: string) {
    if (view === 'All') {
      //this.allView = true;
      this.compareView = true;
      this.fieldBasedView = true;
    } else if (view === 'CompareView') {
      //this.allView = false;
      this.compareView = true;
      this.fieldBasedView = false;
    } else if (view === 'FieldBasedView') {
      //this.allView = false;
      this.compareView = false;
      this.fieldBasedView = true;
    }
  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
