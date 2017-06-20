import { Component } from '@angular/core';

import { ChartistJsService } from './chartistJs.service';

@Component({
  selector: 'nga-chartist-js',
  templateUrl: './chartistJs.html',
  styleUrls: ['./chartistJs.scss'],
})

export class ChartistJsComponent {

  data: any;

  constructor(private _chartistJsService: ChartistJsService) {
  }

  ngOnInit() {
    this.data = this._chartistJsService.getAll();
  }

  getResponsive(padding, offset) {
    return this._chartistJsService.getResponsive(padding, offset);
  }
}
