import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ActivityService } from '../../../../core/services/activity/activity.service';
import { ActivityModel } from '../../../../core/models/activity/activity.model';

import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'nga-manage-activity',
  templateUrl: './manage-activity.html',
  styleUrls: ['./manage-activity.css'],
})

export class ManageActivityComponent {
  
  _activityModel = new ActivityModel();
  _allActivites: any [] = [];
  _dateWiseActivites = [];
  msgs: Message[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _activityService: ActivityService,
    private confirmationService: ConfirmationService,
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
        this._allActivites = data;
        this._allActivites.forEach(element => {
          if ( cnt % 2 === 0) {
            element.customClass = '';
          } else {
            element.customClass = 'timeline-inverted';
          }
        cnt++;
        });
      });
  }
  
  convertDate(inputFormat: any) {
        function pad(s: any) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat);
        return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/');
  }

  edit(id: any) {
    this._router.navigate(['/pages/activities/add-activity/form/' + id ]);
  }

  delete(id: any) { 
    this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this._activityService
                  .Delete(id)
                  .subscribe( data => {
                    this.getAllActivities();
                    this.msgs = [{ 
                      severity: 'info', 
                      summary: 'Confirmed', 
                      detail: 'Activity has been deleted Successfully!!',
                    }];
                  });
                
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            },
        });
  }
}
