import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ActivityService } from '../../../../core/services/activity/activity.service';
import { ActivityModel } from '../../../../core/models/activity/activity.model';


import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';
import { AuthService } from '../../../../core/services/common/auth.service';
import { Configuration } from '../../../../app.constants';
import { FieldsService } from '../../../../core/services/dynamic-fields/fields.service';

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

  serverPath: string;
  authId: string;

  _provinceLists: any[] = [];
  _districtLists: any[] = [];
  _areaLists: any[] = [];

  _districtBasedOnProvince: any[] = [];
  _areaBasedOnProvince: any[] = [];

  _districtOptionLists: any[] = [];
  _areaOptionLists: any[] = [];

  _filteredArray: any [] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private _configuration: Configuration,
    private _authService: AuthService,
    private _fieldsService: FieldsService,
  ) {
    this.serverPath = this._configuration.Server;
        
        if (this._authService.auth_id === '') {
          this.authId = null;
        } else {
          this.authId = this._authService.auth_id;
        }
  }

  ngOnInit() {
    this.getAllActivities();

    this.getAllProvince();
    this.getAllDistrict();
    this.getAllArea();

  }

  getAllProvince() {
      this._fieldsService
          .GetAllProvince()
          .subscribe(
          data => {
              this._provinceLists  = data;
          });
  }
  getAllDistrict() {
      this._fieldsService
          .GetAllDistrict()
          .subscribe(
          data => {
              this._districtLists  = data;
              this._districtLists.forEach(element => {
              const index = element.province;
              if ( !this._districtBasedOnProvince[index] ) {
                  this._districtBasedOnProvince[index] = [];
              }
              this._districtBasedOnProvince[index].push(element.district);
              });
              
          });
    }

    getAllArea() {
      this._fieldsService
          .GetAllArea()
          .subscribe(
          data => {
              this._areaLists  = data;
              this._areaLists.forEach(element => {
              const index = element.province;
              if ( !this._areaBasedOnProvince[index] ) {
                  this._areaBasedOnProvince[index] = [];
              }
              this._areaBasedOnProvince[index].push(element.area);
              });
              
          });
    }
  
  onChangeProvince(value: any) {
        this._allActivites = [];
        if (value == '') {
            this.getAllActivities();
        } else {
            //this.FilteredUsers('province', value);
        }
        

        this._districtOptionLists = [];
        this._areaOptionLists = [];

        this._districtOptionLists = this._districtBasedOnProvince[value];
        this._areaOptionLists = this._areaBasedOnProvince[value];
  }

  onChangeDistrict(value: any) {
        let areaValue = <HTMLInputElement> document.getElementById('area');
        areaValue.value = '';
        if (value == '') {
            let proviceValue = <HTMLInputElement> document.getElementById('provice');
            if (proviceValue) {
                //this.FilteredUsers('province', proviceValue.value);
            } else {
                this.getAllActivities();
            }
        } else {
            //this.FilteredUsers('district', value);
        }
        
    }
    onChangeArea(value: any) {
        let districtValue = <HTMLInputElement> document.getElementById('district');
        districtValue.value = '';
        if (value == '') {
            let proviceValue = <HTMLInputElement> document.getElementById('provice');
            if (proviceValue) {
                //this.FilteredUsers('province', proviceValue.value);
            } else {
                this.getAllActivities();
            }
        } else {
            //this.FilteredUsers('area', value);
        }
        
    }
  onChangeType(value: any) {
    if (value == '') {
      this.getAllActivities();
    } else {

      //this.getAllActivitiesByFiltter(value);
    }
  }

  getAllActivitiesByFiltter(field, value) {

    this._activityService
      .GetActivityBySearch(value)
      .subscribe( data => {
        this._allActivites = [];
        let cnt = 0;
        data.forEach(element => {
          if (element[field] == value) {
            this._allActivites.push(element);
          }
        });
        this._allActivites.forEach(element => {
            if ( cnt % 2 === 0) {
              element.customClass = '';
            } else {
              element.customClass = 'timeline-inverted';
            }
            let startDateTime = new Date(element['createdAt']); 
            let startStamp = startDateTime.getTime();
            element.customSinceTime = this.updateClock(startStamp);
          cnt++;
        });
      });
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
          let startDateTime = new Date(element['createdAt']); 
          let startStamp = startDateTime.getTime();
          element.customSinceTime = this.updateClock(startStamp);
        cnt++;
      });
      //console.log(this._allActivites);
      });
  }

  
  updateClock(startStamp) {
    let newDate = new Date();
    let newStamp = newDate.getTime();
    let diff = Math.round((newStamp-startStamp)/1000);
    
    let d = Math.floor(diff/(24*60*60)); /* though I hope she won't be working for consecutive days :) */
    diff = diff-(d*24*60*60);
    let h = Math.floor(diff/(60*60));
    diff = diff-(h*60*60);
    let m = Math.floor(diff/(60));
    diff = diff-(m*60);
    let s = diff;
    
    return  d + " day(s), " + h + " hour(s), " + m + " minute(s), " + s + " second(s) ago";
}


  edit(id: any) {
    this._router.navigate(['/pages/activities/add-activity/form/' + id]);
  }

  detail(id: any) {
    this._router.navigate(['/pages/activities/detail-activity/form/' + id]);
  }

  delete(id: any) { 
    this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                if (this.authId) {
                  this._activityService
                    .Delete(id, this.authId)
                    .subscribe( data => {
                      this.getAllActivities();
                      this.msgs = [{ 
                        severity: 'info', 
                        summary: 'Confirmed', 
                        detail: 'Activity has been deleted Successfully!!',
                      }];
                    });
                }
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            },
        });
  }
}
