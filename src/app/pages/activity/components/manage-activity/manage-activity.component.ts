import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ActivityService } from '../../../../core/services/activity/activity.service';
import { ActivityModel } from '../../../../core/models/activity/activity.model';

import { Message } from 'primeng/primeng';

@Component({
  selector: 'nga-manage-activity',
  templateUrl: './manage-activity.html',
  styleUrls: ['./manage-activity.css'],
})

export class ManageActivityComponent {
  
  _activityModel = new ActivityModel();
  _allActivites: any [] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _activityService: ActivityService,
  ) {

  }

  ngOnInit() {
    this.getAllActivities();
  }

  getAllActivities() {
    this._activityService
      .GetAll()
      .subscribe( data => {
        let cnt = 0;
        data.forEach(element => {
          if ( cnt % 2 === 0) {
            element.customClass = '';
          } else {
            element.customClass = 'timeline-inverted';
          }
          cnt++;
        });
        this._allActivites = data;
      });
  }
}
